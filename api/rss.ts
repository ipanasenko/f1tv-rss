import { NowRequest, NowResponse } from '@vercel/node';
import axios from 'axios';
import { Feed } from 'feed';
import { descend, match, pipe, prop, sort, uniq } from 'ramda';

interface Episode {
  image_urls: { type: string; url: string }[];
  uid: string;
  created: string;
  title: string;
  slug: string;
  synopsis: string;
}

const getCreatedTS = pipe<Episode, Episode['created'], number>(prop('created'), (created) =>
  new Date(created).valueOf(),
);
const byCreatedDate = descend(getCreatedTS);

export default async (req: NowRequest, res: NowResponse) => {
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

  const { data: home } = await axios.get('https://f1tv-api.formula1.com/agl/1.0/ukr/en/all_devices/global/home');
  const episodeIds = pipe(JSON.stringify, match(/epis_\w+/g), uniq)(home);

  const episodeRequests = await Promise.all(
    episodeIds.map((episodeId) =>
      axios.get(`https://f1tv-api.formula1.com/agl/1.0/unk/en/all_devices/global/episodes/${episodeId}/`),
    ),
  );
  const episodesData: Episode[] = episodeRequests.map(({ data }) => data);

  const sortedEpisodes = sort(byCreatedDate, episodesData);

  sortedEpisodes.forEach((episode) => {
    const synopsis = episode.synopsis ? `<p>${episode.synopsis}</p>` : '';

    feed.addItem({
      title: episode.title,
      description: `<div>${synopsis}<p><img src="${episode.image_urls[0].url}" alt="${episode.title}"></p></div>`,
      link: `https://f1tv.formula1.com/en/episode/${episode.slug}`,
      date: new Date(episode.created),
      image: episode.image_urls[0].url,
      author: [{ name: 'F1 TV' }],
    });
  });

  res.setHeader('content-type', 'application/xml; charset=UTF-8');
  res.status(200).send(feed.atom1());
};
