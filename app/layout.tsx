import '../styles/globals.css';
import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Unofficial F1 TV RSS Feed',
  description: 'Unofficial F1 TV RSS Feed',
  icons: '/favicon.png',
  alternates: {
    types: {
      'application/rss+xml': 'https://f1tv-rss.vercel.app/api/rss',
    },
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
