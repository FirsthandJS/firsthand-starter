/**
 * The page, and the language switch that runs through it.
 *
 * Beside the page it tests, like every other test in this project.
 */
import { afterEach, expect, it } from 'vitest';
import { cleanup, mount } from '@firsthandjs/testing';
import { Home } from './home';
import { t, toggleLanguage } from '../setup/i18n';

afterEach(cleanup);

const Page = Home;

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
