/**
 * The page, and the language switch that runs through it.
 *
 * Beside the page it tests, like every other test in this project.
 *
 * The page loads something now, so it needs the two things a loading page
 * needs: a store to hold its resources, and a network that answers. Both are
 * ordinary values — the store is `createData()`, the network is `fetch` — and
 * replacing them is the whole of what mocking means here.
 */
import { afterEach, beforeEach, expect, it } from 'vitest';
import { cleanup, mount } from '@firsthandjs/testing';
import { component, provide } from '@firsthandjs/dom';
import { DataContext, createData } from '@firsthandjs/data';
import { Home } from './home';
import { cache } from '../setup/api';
import { t, toggleLanguage } from '../setup/i18n';

const original = globalThis.fetch;

beforeEach(() => {
  cache.forget();
  globalThis.fetch = (() =>
    Promise.resolve(
      new Response(JSON.stringify({ generatedAt: 'test', facts: ['Fact one'] })),
    )) as unknown as typeof fetch;
});

afterEach(() => {
  globalThis.fetch = original;
  cleanup();
});

const Page = component(() => {
  provide(DataContext, createData());
  return <Home />;
});

it('renders the page, and follows a language change', () => {
  const view = mount(() => <Page />);
  const english = view.text();
  expect(english).toContain(t('home.title'));

  toggleLanguage();

  // Same nodes, new words: the parts that read `t` re-ran, and nothing else
  // on the page was touched.
  const german = view.text();
  expect(german).not.toBe(english);
  expect(german).toContain(t('home.title'));

  toggleLanguage();
});
