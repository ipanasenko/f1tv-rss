import { PostHog } from 'posthog-node';
import { Feed } from 'feed';
import {
  descend,
  find,
  includes,
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
  const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    enableExceptionAutocapture: true,
  });

  const feed = new Feed({
    title: 'Unofficial F1 TV RSS Feed',
    author: { name: 'F1 TV' },
    link: 'https://f1tv-rss.vercel.app',
    id: 'https://f1tv-rss.vercel.app',
    copyright: '',
    favicon: 'https://f1tv.formula1.com/static/favicon.ico',
    feed: 'https://f1tv-rss.vercel.app/api/rss',
  });
  feed.addCategory('sports');
  feed.addCategory('motorsport');
  feed.addCategory('formula1');

  const f1tvResponse = await fetch(
    'https://f1tv.formula1.com/2.0/A/ENG/WEB_DASH/ALL/PAGE/395/F1_TV_Pro_Annual/2',
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    },
  );
  const data = await f1tvResponse.json();
  const episodesData = pipe(findAllEpisodes, map(transformEpisode))(data);

  const sortedEpisodes = sort(byCreatedDate, episodesData);

  if (!sortedEpisodes.length) {
    posthog.captureException(new Error('No episodes found'));
  }

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

  const rssResponse = feed.atom1().replace(/\s+</g, '<');

  await posthog.shutdown();

  return new Response(rssResponse, {
    headers: { CacheControl: 'public, max-age=3600, s-maxage=3600' },
  });
}
