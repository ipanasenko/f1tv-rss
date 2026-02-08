'use client';

import { Button } from '@/components/ui/button';
import { Check, Copy, Github, Rss } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { FEED_URL } from './const';

/**
 * Hook for the expand-on-interact pattern.
 * - Desktop: CSS hover expands/collapses (no state needed).
 * - Touch: first tap expands, second tap follows through.
 *   Tapping outside collapses.
 */
function useExpandOnHover(enabled: boolean) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  // Collapse when tapping outside
  useEffect(() => {
    if (!expanded) return;
    const controller = new AbortController();
    document.addEventListener(
      'pointerdown',
      (event) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setExpanded(false);
        }
      },
      { signal: controller.signal },
    );
    return () => controller.abort();
  }, [expanded]);

  const handleClick = (event: MouseEvent) => {
    if (!enabled) return;
    // Let hover-capable devices (desktop) pass through normally
    if (window.matchMedia('(hover: hover)').matches) return;
    // Touch device: first tap expands, second tap navigates
    if (!expanded) {
      event.preventDefault();
      setExpanded(true);
    }
    // If already expanded, let the click go through
  };

  const collapsedClass =
    'h-10 w-10 p-0 justify-center transition-all duration-200';
  const expandedTouchClass =
    'h-10 w-auto px-4 gap-2 transition-all duration-200';
  const hoverClass =
    'group h-10 w-10 p-0 justify-center hover:w-auto hover:px-4 hover:gap-2 transition-all duration-200';

  let className: string;
  if (!enabled) {
    className = 'gap-2';
  } else if (expanded) {
    className = expandedTouchClass;
  } else {
    className = `${collapsedClass} ${hoverClass}`;
  }

  const labelClass = expanded
    ? 'whitespace-nowrap'
    : 'hidden group-hover:inline whitespace-nowrap';

  return { ref, expanded, handleClick, className, labelClass };
}

export const GitHubButton = ({
  expandOnHover = false,
}: { expandOnHover?: boolean } = {}) => {
  const posthog = usePostHog();
  const { ref, handleClick, className, labelClass } =
    useExpandOnHover(expandOnHover);

  return (
    <Button
      asChild
      variant="outline"
      className={`bg-white text-red-600 hover:bg-red-50 hover:text-red-700 border-white ${className}`}
    >
      <a
        ref={ref}
        href="https://github.com/ipanasenko/f1tv-rss"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          handleClick(event);
          if (!event.defaultPrevented) {
            posthog.capture('button_click', {
              button_name: 'view_on_github',
            });
          }
        }}
      >
        <Github className="w-4 h-4 shrink-0" />
        {expandOnHover ? (
          <span className={labelClass}>View on GitHub</span>
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
  const { ref, handleClick, className, labelClass } =
    useExpandOnHover(expandOnHover);

  return (
    <Button
      asChild
      className={`bg-red-800 hover:bg-red-900 text-white border-2 border-white ${className}`}
    >
      <a
        ref={ref}
        href={FEED_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          handleClick(event);
          if (!event.defaultPrevented) {
            posthog.capture('button_click', {
              button_name: 'subscribe_to_rss',
            });
          }
        }}
      >
        <Rss className="w-4 h-4 shrink-0" />
        {expandOnHover ? (
          <span className={labelClass}>Subscribe to RSS</span>
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
  const { ref, handleClick, className, labelClass } =
    useExpandOnHover(expandOnHover);

  return (
    <Button
      asChild
      className={`bg-yellow-200 hover:bg-yellow-300 ${className}`}
    >
      <a
        ref={ref}
        href="https://ko-fi.com/ipanasenko"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          handleClick(event);
          if (!event.defaultPrevented) {
            posthog.capture('button_click', { button_name: 'say_thanks' });
          }
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://storage.ko-fi.com/cdn/logomarkLogo.png"
          alt="Ko-fi donations"
          className="animate-wiggle h-5 w-5 shrink-0"
        />
        {expandOnHover ? (
          <span className={labelClass}>Say thanks</span>
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
    <code className="flex items-center bg-red-50 p-2 rounded-md text-sm border border-red-100 min-w-0 w-full">
      <span className="flex-grow min-w-0 break-all">{FEED_URL}</span>
      <Button
        variant="outline"
        size="icon"
        className="gap-2 bg-white text-red-600 hover:bg-red-50 hover:text-red-700 border-red-100 shrink-0 ml-2"
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
