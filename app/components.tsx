'use client';

import { Button } from '@/components/ui/button';
import { Check, Copy, Github, Rss } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { FC, useRef, useState } from 'react';
import { FEED_URL } from './const';

export const GitHubButton = ({
  expandOnHover = false,
}: { expandOnHover?: boolean } = {}) => {
  const posthog = usePostHog();

  return (
    <Button
      asChild
      variant="outline"
      className={`bg-white text-red-600 hover:bg-red-50 hover:text-red-700 border-white ${
        expandOnHover
          ? 'group h-10 w-10 p-0 justify-center hover:w-auto hover:px-4 hover:gap-2 transition-all duration-200'
          : 'gap-2'
      }`}
      onClick={() => {
        posthog.capture('button_click', { button_name: 'view_on_github' });
      }}
    >
      <a
        href="https://github.com/ipanasenko/f1tv-rss"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github className="w-4 h-4 shrink-0" />
        {expandOnHover ? (
          <span className="hidden group-hover:inline whitespace-nowrap">
            View on GitHub
          </span>
        ) : (
          'View on GitHub'
        )}
      </a>
    </Button>
  );
};

export const SubscribeButton = ({
  expandOnHover = false,
}: { expandOnHover?: boolean } = {}) => {
  const posthog = usePostHog();

  return (
    <Button
      asChild
      className={`bg-red-800 hover:bg-red-900 text-white border-2 border-white ${
        expandOnHover
          ? 'group h-10 w-10 p-0 justify-center hover:w-auto hover:px-4 hover:gap-2 transition-all duration-200'
          : 'gap-2'
      }`}
      onClick={() => {
        posthog.capture('button_click', { button_name: 'subscribe_to_rss' });
      }}
    >
      <a href={FEED_URL} target="_blank" rel="noopener noreferrer">
        <Rss className="w-4 h-4 shrink-0" />
        {expandOnHover ? (
          <span className="hidden group-hover:inline whitespace-nowrap">
            Subscribe to RSS
          </span>
        ) : (
          'Subscribe to RSS'
        )}
      </a>
    </Button>
  );
};

export const SayThanksButton = ({
  expandOnHover = false,
}: { expandOnHover?: boolean } = {}) => {
  const posthog = usePostHog();

  return (
    <Button
      asChild
      className={`bg-yellow-200 hover:bg-yellow-300 ${
        expandOnHover
          ? 'group h-10 w-10 p-0 justify-center hover:w-auto hover:px-4 hover:gap-2 transition-all duration-200'
          : 'gap-2'
      }`}
      onClick={() => {
        posthog.capture('button_click', { button_name: 'say_thanks' });
      }}
    >
      <a
        href="https://ko-fi.com/ipanasenko"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://storage.ko-fi.com/cdn/logomarkLogo.png"
          alt="Ko-fi donations"
          className="animate-wiggle h-5 w-5 shrink-0"
        />
        {expandOnHover ? (
          <span className="hidden group-hover:inline whitespace-nowrap">
            Say thanks 🙏 🤗
          </span>
        ) : (
          'Say thanks 🙏 🤗'
        )}
      </a>
    </Button>
  );
};

export const CopyRSSFeed = () => {
  const posthog = usePostHog();

  const timeoutIdRef = useRef<number | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    posthog.capture('button_click', { button_name: 'copy_rss_feed' });

    navigator.clipboard.writeText(FEED_URL);
    setCopied(true);
    window.clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <code className="flex items-center bg-red-50 p-2 rounded-md text-sm border border-red-100 min-w-0">
      <span className="flex-grow truncate">{FEED_URL}</span>
      <Button
        variant="outline"
        size="icon"
        className="gap-2 bg-white text-red-600 hover:bg-red-50 hover:text-red-700 border-red-100"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
    </code>
  );
};
