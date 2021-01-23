import { NowRequest, NowResponse } from '@vercel/node';
import { Feed } from 'feed';
import { chromium } from 'playwright';

interface Episode {
  image_urls: { type: string; url: string }[];
  uid: string;
  created: string;
  title: string;
  slug: string;
  synopsis: string;
}

export default async (req: NowRequest, res: NowResponse) => {
  const feed = new Feed({
    title: 'F1 TV RSS Feed',
    id: 'https://f1tv.formula1.com/en/home',
    copyright: '',
    favicon: 'https://f1tv.formula1.com/assets/favicons/favicon.ico?v=1-30-0',
  });

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('requestfinished', async (request) => {
    if (request.method() === 'GET' && request.url().includes('/episodes/epis_')) {
      const episode: Episode = (await (await request.response()).json()) as Episode;
      console.log('episode', episode);

      feed.addItem({
        title: episode.title,
        description: episode.synopsis,
        link: `https://f1tv.formula1.com/en/episode/${episode.slug}`,
        date: new Date(episode.created),
        image: episode.image_urls[0].url,
      });
    }
  });

  await page.goto('https://f1tv.formula1.com/en/home', { waitUntil: 'networkidle' });

  await browser.close();

  res.status(200).send(feed.atom1());
};
