/**
 * A counter, which is the shortest honest demonstration of what a signal is.
 *
 * Three things are worth watching here.
 *
 * `count` is a signal: the only thing that re-runs when it changes is the
 * expression that reads it. The word beside it is a `computed`, derived from
 * the same signal and from the current language, and it is recomputed only
 * when one of those actually changes — clicking from 2 to 4 does not disturb
 * it, because "even" stayed "even".
 *
 * And the timestamp is the proof rather than the claim: it is read once, while
 * this setup runs. Click the buttons all afternoon and it will not move,
 * because this function is never called again.
 */
import { component, computed, signal } from '@firsthandjs/dom';
import { t } from '../setup/i18n';
import { Button, Note, Panel, Parity, Reset, Row, Value } from './counter.styled';

export const Counter = component(() => {
  const count = signal(0);
  const parity = computed(() => (count.value % 2 === 0 ? t('counter.even') : t('counter.odd')));
  const startedAt = new Date().toLocaleTimeString();

  return (
    <Panel>
      <Row>
        <Value>{count.value}</Value>
        <Parity>{parity.value}</Parity>
        <Button
          type="button"
          $quiet
          aria-label={t('counter.decrement')}
          onClick={() => {
            count.value--;
          }}
        >
          −
        </Button>
        <Button
          type="button"
          aria-label={t('counter.increment')}
          onClick={() => {
            count.value++;
          }}
        >
          +
        </Button>
        <Reset
          type="button"
          $quiet
          onClick={() => {
            count.value = 0;
          }}
        >
          {t('counter.reset')}
        </Reset>
      </Row>
      <Note>{t('counter.note', { time: startedAt })}</Note>
    </Panel>
  );
});
