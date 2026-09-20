/**
 * What a test looks like here. The file sits beside what it tests.
 *
 * `mount` renders into a container attached to the document and cleans up
 * after itself; there is no `act`, no `await` and no flush, because an update
 * is synchronous. Assert what a person would see.
 */
import { afterEach, expect, it } from 'vitest';
import { cleanup, mount } from '@firsthandjs/testing';
import { Counter } from './counter';
import { t } from '../setup/i18n';

afterEach(cleanup);

it('counts, and does not run the component again to do it', () => {
  const view = mount(() => <Counter />);
  const [decrement, increment] = view.all<HTMLButtonElement>('button');
  const note = view.get('p').textContent;

  expect(view.get('output').textContent).toBe('0');

  increment?.click();
  increment?.click();
  decrement?.click();

  // One write, one DOM update, no await.
  expect(view.get('output').textContent).toBe('1');
  // The word beside it is derived from the same signal.
  expect(view.text()).toContain(t('counter.odd'));
  // And the timestamp was read while the setup ran, which happened once.
  expect(view.get('p').textContent).toBe(note);
});
