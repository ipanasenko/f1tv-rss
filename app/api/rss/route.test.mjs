import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, test } from 'node:test';
import { GET } from './route.ts';

const originalFetch = globalThis.fetch;

const episodeContainer = ({
  created,
  href,
  id,
  pictureUrl = `${id}.jpg`,
  synopsis = `${id} synopsis`,
  title = id,
}) => ({
  actions: href ? [{ href }] : [],
  metadata: {
    contractStartDate: created,
    externalId: id,
    longDescription: synopsis,
    pictureUrl,
    title,
  },
});

let upstreamData;

beforeEach(() => {
  globalThis.fetch = async (url, options) => {
    assert.equal(
      url,
      'https://f1tv.formula1.com/2.0/A/ENG/WEB_DASH/ALL/PAGE/395/F1_TV_Pro_Annual/2',
    );
    assert.deepEqual(options, { next: { revalidate: 3600 } });

    return { json: async () => upstreamData };
  };
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe('GET /api/rss', () => {
  test('returns recursively discovered detail episodes as newest-first Atom entries', async () => {
    upstreamData = {
      resultObj: {
        containers: [
          {
            ...episodeContainer({
              created: 0,
              href: '/page/collection',
              id: 'collection',
            }),
            retrieveItems: {
              resultObj: {
                containers: [
                  episodeContainer({
                    created: 1_000,
                    href: '/detail/old?action=play',
                    id: 'old',
                    synopsis: '',
                    title: 'Old Episode',
                  }),
                  episodeContainer({
                    created: 1_500,
                    href: '/browse/not-an-episode',
                    id: 'ignored',
                    title: 'Ignored Container',
                  }),
                ],
              },
            },
          },
          episodeContainer({
            created: 2_000,
            href: '/detail/new?action=play',
            id: 'new',
            pictureUrl: 'new-image.jpg',
            synopsis: 'New synopsis',
            title: 'New Episode',
          }),
          {
            metadata: episodeContainer({
              created: 3_000,
              id: 'no-actions',
            }).metadata,
          },
        ],
      },
    };

    const response = await GET();
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type'), 'application/atom+xml');
    assert.equal(
      response.headers.get('cache-control'),
      'public, max-age=3600, s-maxage=3600',
    );
    assert.ok(body.startsWith('<?xml version="1.0" encoding="utf-8"?>'));
    assert.ok(body.indexOf('New Episode') < body.indexOf('Old Episode'));
    assert.ok(!body.includes('Ignored Container'));
    assert.ok(!body.includes('no-actions'));
    assert.ok(body.includes('https://f1tv.formula1.com/detail/new'));
    assert.ok(!body.includes('?action=play'));
    assert.ok(
      body.includes(
        'https://f1tv.formula1.com/image-resizer/image/new-image.jpg?w=708&amp;h=398&amp;q=HI&amp;o=L',
      ),
    );
    assert.ok(body.includes('<p>New synopsis</p>'));
    assert.match(
      body,
      /Old Episode[\s\S]*?<summary type="html"><!\[CDATA\[<div><p><img/,
    );
  });

  test('limits the feed to the 20 newest episodes', async () => {
    upstreamData = {
      resultObj: {
        containers: Array.from({ length: 21 }, (_, index) => {
          const episodeNumber = index + 1;
          return episodeContainer({
            created: episodeNumber * 1_000,
            href: `/detail/${episodeNumber}?action=play`,
            id: `episode-${episodeNumber}`,
            title: `Episode ${episodeNumber}`,
          });
        }),
      },
    };

    const body = await (await GET()).text();

    assert.equal(body.match(/<entry>/g)?.length, 20);
    assert.ok(body.includes('<![CDATA[Episode 21]]>'));
    assert.ok(!body.includes('<![CDATA[Episode 1]]>'));
  });

  test('returns an empty feed when the upstream response has no containers', async () => {
    upstreamData = { resultObj: {} };

    const body = await (await GET()).text();

    assert.ok(body.includes('<title>Unofficial F1 TV RSS Feed</title>'));
    assert.ok(!body.includes('<entry>'));
  });
});
