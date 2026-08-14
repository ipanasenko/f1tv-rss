'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Copy, GitFork, Heart, Rss } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { useRef, useState } from 'react';
import { FEED_URL } from './const';

type ActionButtonProps = {
  className?: string;
  label?: string;
};

export const GitHubButton = ({
  className,
  label = 'View on GitHub',
}: ActionButtonProps) => {
  const posthog = usePostHog();

  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        'gap-2 border-white bg-white text-red-600 hover:bg-red-50 hover:text-red-700',
        className,
      )}
      onClick={() => {
        posthog.capture('button_click', { button_name: 'view_on_github' });
      }}
    >
      <a
        href="https://github.com/ipanasenko/f1tv-rss"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label || 'View on GitHub'}
      >
        <GitFork className="h-4 w-4" />
        {label}
      </a>
    </Button>
  );
};

export const SubscribeButton = ({
  className,
  label = 'Subscribe to RSS',
}: ActionButtonProps) => {
  const posthog = usePostHog();

  return (
    <Button
      asChild
      className={cn(
        'gap-2 border-2 border-white bg-red-800 text-white hover:bg-red-900',
        className,
      )}
      onClick={() => {
        posthog.capture('button_click', { button_name: 'subscribe_to_rss' });
      }}
    >
      <a href={FEED_URL} target="_blank" rel="noopener noreferrer">
        <Rss className="w-4 h-4" />
        {label}
      </a>
    </Button>
  );
};

export const SayThanksButton = ({
  className,
  label = 'Say thanks',
}: ActionButtonProps) => {
  const posthog = usePostHog();

  return (
    <Button
      asChild
      className={cn('gap-2 bg-yellow-200 hover:bg-yellow-300', className)}
      onClick={() => {
        posthog.capture('button_click', { button_name: 'say_thanks' });
      }}
    >
      <a
        href="https://ko-fi.com/ipanasenko"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label || 'Say thanks'}
      >
        <Heart className="h-4 w-4" />
        {label}
      </a>
    </Button>
  );
};

export const CopyRSSButton = ({
  className,
  label = 'Copy feed',
}: ActionButtonProps) => {
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
    <Button
      variant="outline"
      className={cn('gap-2', className)}
      onClick={handleCopy}
      aria-label="Copy RSS feed URL"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied' : label}
    </Button>
  );
};
