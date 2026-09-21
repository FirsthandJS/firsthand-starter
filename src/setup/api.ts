/**
 * The application's one client, configured once.
 *
 * `createFetchClient` is a small REST client on the browser's own `fetch`: a
 * base URL, headers read per request, a failed status thrown, the abort signal
 * wired through, and a cache.
 *
 * The cache is passed in rather than configured inline, because it is *the*
 * cache: give the same object to a second client and the whole application has
 * one memory. Thirty seconds is a lifetime chosen for this starter — with no
 * `ttl` at all it would still share requests that overlap in time, which is
 * free of staleness and needs no decision.
 */
import { createCacheClient, createFetchClient } from '@firsthandjs/data';

export const cache = createCacheClient({ ttl: 30_000 });

export const api = createFetchClient({
  baseUrl: import.meta.env.BASE_URL,
  cache,
  // Where a token would go. It is a function, so it is read per request — a
  // token that changes is the current one — and untracked, so no resource
  // depends on it:
  //
  //   headers: () => ({ authorization: `Bearer ${token.value}` }),
});

/** What `public/facts.json` holds. A real application would generate this. */
export interface FactsResponse {
  readonly generatedAt: string;
  readonly facts: readonly string[];
}
