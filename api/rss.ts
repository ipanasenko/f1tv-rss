import { NowRequest, NowResponse } from '@vercel/node';
import RSS from 'rss';

export default (req: NowRequest, res: NowResponse) => {
  const rss = new RSS({
    title: 'F1 TV',
    feed_url: '',
    site_url: 'https://f1tv.formula1.com/en/home',
  });

  rss.item({ title: 'dummy item', description: 'd i', url: 'http://example.com', date: new Date().toLocaleString() });

  res.status(200).send(rss.xml());
};
