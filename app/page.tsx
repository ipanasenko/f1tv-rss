import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Rss, Copy } from 'lucide-react';
import {
  CopyRSSFeed,
  GitHubButton,
  SayThanksButton,
  SubscribeButton,
} from './components';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-700">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-white text-5xl font-bold mb-4">
            <span className="italic opacity-35">Unofficial</span> F1 TV RSS Feed
          </h1>
          <p className="text-red-100 text-lg mb-8">
            Stay updated with Formula 1 content through a convenient RSS feed
          </p>
          <div className="flex justify-center gap-4">
            <GitHubButton />
            <SubscribeButton />
            <SayThanksButton />
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-white border-none shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-red-600">Features</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  Automatic updates for new F1 TV content
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  Compatible with any RSS reader
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-red-600">Usage</h2>
              <div className="space-y-4 text-gray-700">
                <p>Add the following URL to your RSS reader:</p>
                <CopyRSSFeed />
                <p className="text-sm text-gray-600">
                  The feed automatically updates when new content is available
                  on F1 TV.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
