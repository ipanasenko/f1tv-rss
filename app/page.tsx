import {
  CopyRSSButton,
  GitHubButton,
  SayThanksButton,
  SubscribeButton,
} from './components';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#ff3b30] text-[#101010]">
      <div className="absolute inset-x-0 top-[32%] h-16 -skew-y-3 bg-[#ffdf4d]" />

      <header className="relative z-10 flex items-center justify-between px-5 py-5 md:px-9">
        <div className="rounded-full border-2 border-black bg-white px-4 py-2 text-xs font-black shadow-[3px_3px_0_#111]">
          F1 TV RSS
        </div>
        <div className="flex gap-2">
          <GitHubButton
            label=""
            className="size-10 rounded-full border-2 border-black bg-white p-0 text-black shadow-[3px_3px_0_#111] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-white hover:text-black hover:shadow-none"
          />
          <SayThanksButton
            label=""
            className="size-10 rounded-full border-2 border-black bg-[#ffdf4d] p-0 text-black shadow-[3px_3px_0_#111] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-[#ffdf4d] hover:text-black hover:shadow-none"
          />
        </div>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl flex-col items-center justify-center px-5 pb-16 text-center xl:pb-6">
        <div className="rotate-[-2deg] border-2 border-black bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] shadow-[5px_5px_0_#111]">
          The unofficial F1 TV feed with official pace
        </div>
        <h1 className="mt-8 text-[clamp(4.3rem,13vw,11rem)] font-black uppercase leading-[0.72] tracking-[-0.09em] [text-shadow:5px_5px_0_#fff]">
          STOP
          <br />
          REFRESHING
        </h1>
        <p className="mt-10 max-w-xl rotate-1 border-2 border-black bg-[#ffdf4d] p-5 text-lg font-bold shadow-[7px_7px_0_#111]">
          New F1 TV content goes straight to your RSS reader.{' '}
          <span className="whitespace-nowrap">Simple. Automatic. Direct.</span>
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <SubscribeButton className="h-14 rounded-none border-2 border-black bg-white px-7 text-sm font-black text-black shadow-[6px_6px_0_#111] transition hover:translate-x-1 hover:translate-y-1 hover:bg-white hover:text-black hover:shadow-none" />
          <CopyRSSButton className="h-14 w-40 rounded-none border-2 border-black bg-[#ffdf4d] px-7 text-sm font-black text-black shadow-[6px_6px_0_#111] transition hover:translate-x-1 hover:translate-y-1 hover:bg-[#ffdf4d] hover:text-black hover:shadow-none" />
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-3 text-xs font-bold">
          <li className="rounded-full border-2 border-black bg-white px-4 py-2">
            ✓ ANY READER
          </li>
          <li className="rounded-full border-2 border-black bg-white px-4 py-2">
            ✓ AUTO UPDATES
          </li>
          <li className="rounded-full border-2 border-black bg-white px-4 py-2">
            ✓ FREE
          </li>
        </ul>
      </section>

      <p className="absolute bottom-1.5 left-1/2 z-10 w-full -translate-x-1/2 text-center text-[9px] font-bold uppercase tracking-[0.14em]">
        Unofficial project · Not affiliated with Formula 1 or F1 TV
      </p>
    </main>
  );
}
