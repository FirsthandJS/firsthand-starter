/**
 * The three screens, tested the way a visitor meets them: by clicking.
 *
 * What is worth asserting is not that each screen renders — it is that the
 * one before it is gone, and that the answers behind them are not.
 */
import { afterEach, expect, it } from 'vitest';
import { cleanup, mount } from '@firsthandjs/testing';
import { Steps } from './steps';
import { t } from '../setup/i18n';

afterEach(cleanup);

const press = (view: ReturnType<typeof mount>, label: string): void => {
  const button = view
    .all<HTMLButtonElement>('button')
    .find((one) => one.textContent?.trim() === label);
  if (button === undefined) {
    throw new Error(
      `No button labelled ${label}. Buttons: ${view
        .all('button')
        .map((b) => b.textContent)
        .join(', ')}`,
    );
  }
  button.click();
};

it('asks one question at a time', () => {
  const view = mount(() => <Steps />);

  expect(view.text()).toContain(t('steps.strength'));
  expect(view.text()).not.toContain(t('steps.milk'));

  press(view, t('steps.strong'));

  // The screen was replaced, not added to: a branch left behind would show
  // both questions at once.
  expect(view.text()).toContain(t('steps.milk'));
  expect(view.text()).not.toContain(t('steps.strength'));
});

it('keeps the answer behind it when you step back', () => {
  const view = mount(() => <Steps />);

  press(view, t('steps.strong'));
  press(view, t('steps.back'));

  // The signals live in the setup, which ran once and is not run again by the
  // screens being swapped — so the earlier answer is still the marked one.
  // A chosen answer is filled in; the others carry the transparent override.
  const style = (label: string): string =>
    view
      .all<HTMLButtonElement>('button')
      .find((one) => one.textContent?.trim() === label)
      ?.getAttribute('style') ?? '';

  expect(style(t('steps.strong'))).not.toContain('transparent');
  expect(style(t('steps.light'))).toContain('transparent');
});

it('puts both answers together at the end, and starts again', () => {
  const view = mount(() => <Steps />);

  press(view, t('steps.light'));
  press(view, t('steps.yes'));
  expect(view.text()).toContain(t('steps.lightTea').trim());
  expect(view.text()).toContain(t('steps.withMilk'));

  press(view, t('steps.again'));
  expect(view.text()).toContain(t('steps.strength'));
});
