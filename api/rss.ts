import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { Feed } from 'feed';
import { contains, descend, find, map, pipe, prop, propSatisfies, sort } from 'ramda';

interface Episode {
  imageURL: string;
  uid: string;
  created: number;
  title: string;
  link: string;
  synopsis: string;
}

interface DetailAction {
  href: string;
}

const getCreatedTS = prop('created');
const byCreatedDate = descend(getCreatedTS);

const findDetailAction = find<DetailAction>(propSatisfies(contains('/detail/'), 'href'));

const findAllEpisodes = (obj, currentItems = []) => {
  const containerItems = obj.resultObj.containers || [];
  return containerItems.reduce((acc, containerItem) => {
    if (containerItem.retrieveItems) {
      // going deeper into recursion
      return findAllEpisodes(containerItem.retrieveItems, acc);
    }

    const detailAction = findDetailAction(containerItem.actions || []);
    if (detailAction) {
      // found an item!
      return [...acc, containerItem];
    }

    return acc;
  }, currentItems);
};

const transformEpisode = (containerItem): Episode => {
  const { externalId, pictureUrl, longDescription, contractStartDate, title } = containerItem.metadata;
  const detailAction = findDetailAction(containerItem.actions);

  return {
    imageURL: `https://ott.formula1.com/image-resizer/image/${pictureUrl}?w=576&h=324&o=L`,
    uid: externalId,
    created: contractStartDate,
    title,
    link: `https://f1tv.formula1.com${detailAction.href.replace('?action=play', '')}`,
    synopsis: longDescription,
  };
};

export default async (req: VercelRequest, res: VercelResponse) => {
  const feed = new Feed({
    title: 'F1 TV',
    id: 'https://f1tv.formula1.com/en/home',
    copyright: '',
    favicon: 'https://f1tv.formula1.com/assets/favicons/favicon.ico?v=1-30-0',
    feed: 'https://f1tv-rss.vercel.app/api/rss',
  });
  feed.addCategory('sports');
  feed.addCategory('motorsport');
  feed.addCategory('formula1');

  const { data } = await axios.get('https://f1tv.formula1.com/2.0/A/ENG/WEB_DASH/ALL/PAGE/395/F1_TV_Pro_Annual/2');
  const episodesData = pipe(findAllEpisodes, map(transformEpisode))(data);

  const sortedEpisodes = sort(byCreatedDate, episodesData);

  sortedEpisodes.forEach((episode) => {
    const synopsis = episode.synopsis ? `<p>${episode.synopsis}</p>` : '';

    feed.addItem({
      title: episode.title,
      description: `<div>${synopsis}<p><img src="${episode.imageURL}" alt="${episode.title}"></p></div>`,
      link: episode.link,
      date: new Date(episode.created),
      image: episode.imageURL,
      author: [{ name: 'F1 TV' }],
    });
  });

  res.setHeader('content-type', 'application/xml; charset=UTF-8');
  res.status(200).send(feed.atom1());
};
