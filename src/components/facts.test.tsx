/**
 * The data demo, tested where a person would look: at the screen.
 *
 * `fetch` is replaced, which is the level worth testing at — the component,
 * the resource, the client and its cache all run for real, and only the
 * network is pretend. [MSW](https://mswjs.io) does the same thing with more
 * ceremony and is worth it once there are more than two endpoints.
 */
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { cleanup, mount } from '@firsthandjs/testing';
import { component, provide } from '@firsthandjs/dom';
import { DataContext, createData } from '@firsthandjs/data';
import { Facts } from './facts';
import { cache } from '../setup/api';

const original = globalThis.fetch;
let served = 0;

beforeEach(() => {
  served = 0;
  cache.forget();
  globalThis.fetch = (() => {
    served += 1;
    return Promise.resolve(
      new Response(JSON.stringify({ generatedAt: `call ${String(served)}`, facts: ['Fact one'] })),
    );
  }) as unknown as typeof fetch;
});

afterEach(() => {
  globalThis.fetch = original;
  cleanup();
});

/** The store is provided by `main.tsx` in the application; here, by the test. */
const Host = component(() => {
  provide(DataContext, createData());
  return <Facts />;
});

it('loads the list, and shows it', async () => {
  const view = mount(() => <Host />);

  await vi.waitFor(() => {
    expect(view.text()).toContain('Fact one');
  });
  expect(served).toBe(1);
});

it('serves a second component from the cache rather than the network', async () => {
  const first = mount(() => <Host />);
  await vi.waitFor(() => {
    expect(first.text()).toContain('Fact one');
  });

  const second = mount(() => <Host />);
  await vi.waitFor(() => {
    expect(second.text()).toContain('Fact one');
  });

  // Two resources — they are two call sites — and one request, because the
  // cache is at the transport where the two requests are known to be the same.
  expect(served).toBe(1);
});

it('reaches through the cache when the tag is invalidated', async () => {
  const view = mount(() => <Host />);
  await vi.waitFor(() => {
    expect(view.text()).toContain('Fact one');
  });

  view.get<HTMLButtonElement>('button').click();

  // Without `force` reaching the client, this would be answered out of the
  // very cache the invalidation was meant to defeat.
  await vi.waitFor(() => {
    expect(served).toBe(2);
  });
});
