import {
  CopyRSSButton,
  GitHubButton,
  SayThanksButton,
  SubscribeButton,
} from './components';

// The palette follows the system setting via `prefers-color-scheme`
// (tailwind.config.js sets darkMode: 'media'). Light is the base, dark: overrides.
export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#f3f1ee] px-5 py-8 text-[#141414] dark:bg-[#0a0a0b] dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,rgba(225,6,0,0.16),transparent_58%)] dark:bg-[radial-gradient(ellipse_at_50%_-10%,rgba(225,6,0,0.35),transparent_60%)]" />

      <div className="relative z-10 flex flex-1 items-center justify-center py-6">
        <div className="w-full max-w-xl rounded-3xl border border-black/[0.08] bg-white p-7 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.25)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:backdrop-blur-xl sm:p-9 md:p-11">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#e10600] text-[13px] font-bold text-white">
                F1
              </span>
              <span className="text-[13px] font-medium text-[#141414]/70 dark:text-white/70">
                F1 TV RSS
              </span>
            </div>

            <div className="flex items-center gap-1">
              <GitHubButton
                label=""
                className="size-9 rounded-lg border-0 bg-transparent p-0 text-[#141414]/45 shadow-none hover:bg-black/[0.06] hover:text-[#141414] dark:text-white/45 dark:hover:bg-white/10 dark:hover:text-white"
              />
              <SayThanksButton
                label=""
                className="size-9 rounded-lg bg-transparent p-0 text-[#141414]/45 shadow-none hover:bg-black/[0.06] hover:text-[#141414] dark:text-white/45 dark:hover:bg-white/10 dark:hover:text-white"
              />
            </div>
          </div>

          <h1 className="mt-9 text-balance text-[clamp(1.9rem,4vw,2.7rem)] font-medium leading-[1.12] tracking-[-0.03em]">
            Never miss an F1&nbsp;TV upload.
          </h1>
          <p className="mt-4 text-[15.5px] leading-relaxed text-[#141414]/55 dark:text-white/55">
            Race replays, highlights, press conferences, tech breakdowns — the
            moment F1 TV publishes, your reader has it.
          </p>

          <div className="mt-8 space-y-2.5">
            <SubscribeButton
              label="Subscribe to the feed"
              className="h-12 w-full rounded-xl bg-[#141414] px-6 text-[14.5px] font-medium text-white shadow-none hover:bg-[#333] dark:bg-white dark:text-[#0a0a0b] dark:hover:bg-white/90"
            />
            <CopyRSSButton
              label="Copy feed URL"
              className="h-12 w-full rounded-xl border border-black/[0.12] bg-white px-6 text-[14.5px] font-medium text-[#141414] shadow-none hover:bg-black/[0.04] dark:border-white/[0.12] dark:bg-transparent dark:text-white dark:hover:bg-white/[0.08]"
            />
          </div>

          <p className="mt-8 border-t border-black/[0.08] pt-5 text-center text-[12px] text-[#141414]/40 dark:border-white/[0.08] dark:text-white/40">
            Any reader · Auto updates · Free
          </p>
        </div>
      </div>

      <p className="relative z-10 mx-auto max-w-2xl text-center text-[11px] leading-relaxed text-[#141414]/45 dark:text-white/35">
        <span className="block sm:inline">
          Unofficial project · Not affiliated with Formula&nbsp;1 or F1&nbsp;TV
        </span>
        <span className="hidden sm:inline"> · </span>
        <span className="block sm:inline">
          An F1&nbsp;TV account is needed to watch the videos
        </span>
      </p>
    </main>
  );
}
