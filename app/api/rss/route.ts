import { VercelRequest, VercelResponse } from '@vercel/node';
import { Feed } from 'feed';
import {
  includes,
  descend,
  find,
  map,
  pipe,
  prop,
  propSatisfies,
  sort,
} from 'ramda';

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
const byCreatedDate = descend<Episode>(getCreatedTS);

const findDetailAction = find<DetailAction>(
  propSatisfies(includes('/detail/'), 'href'),
);

const findAllEpisodes = (obj: any, currentItems = []) => {
  const containerItems: any[] = obj.resultObj.containers || [];
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

const transformEpisode = (containerItem: any): Episode => {
  const { externalId, pictureUrl, longDescription, contractStartDate, title } =
    containerItem.metadata;
  const detailAction = findDetailAction(containerItem.actions)!;

  return {
    imageURL: `https://f1tv.formula1.com/image-resizer/image/${pictureUrl}?w=708&h=398&q=HI&o=L`,
    uid: externalId,
    created: contractStartDate,
    title,
    link: `https://f1tv.formula1.com${detailAction.href.replace(
      '?action=play',
      '',
    )}`,
    synopsis: longDescription,
  };
};

export async function GET() {
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

  const response = await fetch(
    'https://f1tv.formula1.com/2.0/A/ENG/WEB_DASH/ALL/PAGE/395/F1_TV_Pro_Annual/2',
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    },
  );
  const data = await response.json();
  const episodesData = pipe(findAllEpisodes, map(transformEpisode))(data);

  const sortedEpisodes = sort(byCreatedDate, episodesData);

  sortedEpisodes.slice(0, 20).forEach((episode) => {
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

  return new Response(feed.atom1());
}
