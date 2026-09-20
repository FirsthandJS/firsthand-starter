/**
 * One test, to show what testing this looks like.
 *
 * `mount` renders into a container and cleans up after itself; there is no
 * `act`, no `await` and no flush, because an update is synchronous. Assert
 * what a person would see.
 */
import { afterEach, expect, it } from 'vitest';
import { cleanup, mount } from '@firsthandjs/testing';
import { Home } from './pages/home';
import { t, toggleLanguage } from './i18n';

afterEach(cleanup);

it('renders the page, and follows a language change', () => {
  const view = mount(() => <Home />);
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
