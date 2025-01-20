import '../styles/globals.css';
import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { CSPostHogProvider } from './providers';

export const metadata: Metadata = {
  title: 'Unofficial F1 TV RSS Feed',
  description:
    'Stay updated with Formula 1 content through a convenient RSS feed',
  keywords: [
    'F1',
    'Formula 1',
    'RSS',
    'feed',
    'news',
    'Formula 1 TV',
    'F1 TV',
    'F1 TS RSS Feed',
  ],
  icons: '/favicon.png',
  verification: {
    google: 's59NRBOGWvj3JYMUyTS7VAxHUaaQznnEBfeHziytWZM',
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://f1tv-rss.vercel.app/api/rss',
    },
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body>{children}</body>
      </CSPostHogProvider>
    </html>
  );
}
