import { Card, CardContent } from '@/components/ui/card';
import {
  CopyRSSFeed,
  GitHubButton,
  SayThanksButton,
  SubscribeButton,
} from './components';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e8e4dc] text-[#2c2825]">
      {/* Retro header strip — full width */}
      <div className="bg-[#c41e3a] text-[#e8e4dc] py-2 px-4 text-center text-sm font-medium tracking-widest uppercase">
        Unofficial · Formula 1
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-[#2c2825] mb-4 leading-[0.95]">
            F1 TV
            <br />
            <span className="text-[#c41e3a]">RSS Feed</span>
          </h1>
          <p className="text-[#5c564f] text-lg mb-10">
            Stay updated with Formula 1 content through a convenient RSS feed.
          </p>
          <div className="flex flex-wrap gap-3 [&>*]:w-44">
            <SubscribeButton />
            <GitHubButton />
            <SayThanksButton />
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/80 border-2 border-[#2c2825]/10 rounded-none shadow-none min-w-0">
            <CardContent className="p-6">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#c41e3a] mb-4">
                Features
              </h2>
              <ul className="space-y-2 text-[#2c2825]/90">
                <li className="flex items-start gap-2">
                  <span className="text-[#c41e3a] mt-0.5">▸</span>
                  Automatic updates for new F1 TV content
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c41e3a] mt-0.5">▸</span>
                  Compatible with any RSS reader
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/80 border-2 border-[#2c2825]/10 rounded-none shadow-none min-w-0">
            <CardContent className="p-6 overflow-hidden">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#c41e3a] mb-4">
                Usage
              </h2>
              <p className="text-[#5c564f] text-sm mb-4">
                Add this URL to your RSS reader:
              </p>
              <CopyRSSFeed />
              <p className="text-[#5c564f] text-xs mt-4">
                Feed updates when new content is on F1 TV.
              </p>
            </CardContent>
          </Card>
        </div>

        <p className="mt-12 text-center text-[#5c564f] text-sm">
          — No affiliation with Formula 1 or F1 TV —
        </p>
      </div>
    </div>
  );
}
