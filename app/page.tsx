import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Rss } from 'lucide-react';

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
            <Button
              asChild
              variant="outline"
              className="gap-2 bg-white text-red-600 hover:bg-red-50 hover:text-red-700 border-white"
            >
              <a
                href="https://github.com/ipanasenko/f1tv-rss"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </Button>
            <Button
              asChild
              className="gap-2 bg-red-800 hover:bg-red-900 text-white border-2 border-white"
            >
              <a
                href="https://f1tv-rss.vercel.app/api/rss"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Rss className="w-4 h-4" />
                Subscribe to RSS
              </a>
            </Button>
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
                <code className="block bg-red-50 p-3 rounded-md text-sm border border-red-100">
                  https://f1tv-rss.vercel.app/api/rss
                </code>
                <p className="text-sm text-gray-600">
                  The feed automatically updates when new content is available
                  on F1 TV.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-lg text-red-100">
            🙏 Say thanks:{' '}
            <a
              href="https://ko-fi.com/ipanasenko"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ko-fi.com/ipanasenko
            </a>{' '}
            <svg
              style={{ display: 'inline-block' }}
              fill="none"
              viewBox="0 0 391 391"
              height="18"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m52 102h296v199h-296z" fill="#fff" />
              <path
                d="m174 1.09995c-79.2999 8.9-145.5999 65.29995-166.59995 141.70005-15.2 55.6-5.8 114 26.10005 161.7 61.7 92.3 189.4999 114.2 278.7999 47.8 74.8-55.8 99.8-156.6 59.7-241-9.7-20.3001-20.4-35.6001-36.4-52.2001-27.2-27.9-61.3-46.7-99.6-54.99995-18.3-3.900005-43.3-5.1-62-3zm117.8 102.90005c25.2 7 43.6 24.6 50.2 48 7.8 28.1-.1 55.6-21.5 73.9-11.5 9.8-32.5 17.1-49.6 17.1h-7.6l-.8 7.2c-1.9 19.4-11.4 32.5-27 37-2.9.9-25.2 1.2-80 1.2l-75.9999.1-6-2.8c-9.6-4.5-16.9-12.7-19.7-22.2-.4-1.6-.8-36.6-.8-77.8 0-80.7 0-80.6 5.2-82.7 1.4-.5 48.5999-.9 114.2999-.9 109.5-.1 112.2-.1 119.3 1.9z"
                fill="#579fbf"
              />
              <path
                d="m264 173v34h8.8c15.5 0 25-5.3 31.2-17.4 3.3-6.6 3.5-7.4 3.5-17.5 0-9.6-.3-11.1-2.8-16.3-3-6.2-8.6-11.6-15.2-14.8-3.3-1.6-6.2-2-14.8-2h-10.7z"
                fill="#579fbf"
              />
              <path
                d="m177.885 147.41c-7.3 2.4-9.6 3.7-15.3 8.4l-4.7 3.9-4.3-3.5c-14.2-11.6-35-12.9-46.7-2.9-5.8 5-8.1996 10.3-8.7996 19.4-.5 8.1 1.2 15.8 4.9996 23.2 1.1 2.2 5.9 8 10.6 13 14.7 15.3 42.4 40.7 44.4 40.7 1.2 0 12.1-10.1 27.3-25.3 22.9-22.8 25.7-25.9 28.6-32.1 4.1-8.7 5-18.8 2.5-26.4-4.9-14.6-23.4-23.4-38.6-18.4z"
                fill="#ff5f5f"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
}
