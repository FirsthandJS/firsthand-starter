/**
 * Three screens, one function, and what that function is for.
 *
 * A setup runs **once**. That is the rule everything else rests on: it is why
 * a component keeps its state, why a handler is never stale, and why there is
 * nothing to memoise. It is also why a choice made in a setup is made for
 * ever — `if (step === 'milk')` there would decide while the page was being
 * built, and never again.
 *
 * So a setup may return a **function**, and that function is a reactive scope
 * of its own: it runs again when something it read in a statement changes, and
 * in between it is ordinary code. Three things follow, and this is here to
 * show them.
 *
 * **Each state can be its own component.** Not one component with a `mode`
 * prop and an `if` buried inside it — three, each knowing only its own
 * question. The `switch` below is the whole of the routing between them.
 *
 * **What the setup made outlives the switching.** `strength` and `milk` are
 * signals of the setup, so stepping back finds the earlier answer still
 * chosen. The screens are replaced; the state behind them is not.
 *
 * **And it runs only when the state changes.** Picking an answer moves the
 * step, so the function chooses again; nothing else on the page is asked to
 * do anything. Open the devtools panel with Ctrl+Shift+F and watch: three
 * screens, three runs, and the panel around them made once.
 */
import { component, signal, type View } from '@firsthandjs/dom';
import { t } from '../setup/i18n';
import { Choice, Panel, Plain, Question, Screen } from './steps.styled';

type Step = 'strength' | 'milk' | 'ready';
type Strength = 'light' | 'strong';

const AskStrength = component<{
  readonly chosen: Strength;
  readonly onPick: (strength: Strength) => void;
}>((props) => (
  <Screen>
    <Question>{t('steps.strength')}</Question>
    <Choice type="button" $on={props.chosen === 'light'} onClick={() => props.onPick('light')}>
      {t('steps.light')}
    </Choice>
    <Choice type="button" $on={props.chosen === 'strong'} onClick={() => props.onPick('strong')}>
      {t('steps.strong')}
    </Choice>
  </Screen>
));

const AskMilk = component<{
  readonly onPick: (milk: boolean) => void;
  readonly onBack: () => void;
}>((props) => (
  <Screen>
    <Question>{t('steps.milk')}</Question>
    <Choice type="button" onClick={() => props.onPick(true)}>
      {t('steps.yes')}
    </Choice>
    <Choice type="button" onClick={() => props.onPick(false)}>
      {t('steps.no')}
    </Choice>
    <Plain type="button" onClick={props.onBack}>
      {t('steps.back')}
    </Plain>
  </Screen>
));

const Ready = component<{
  readonly strength: Strength;
  readonly milk: boolean;
  readonly onAgain: () => void;
}>((props) => (
  <Screen>
    <Question>
      {t(`steps.${props.strength}Tea`)}
      {props.milk ? t('steps.withMilk') : t('steps.withoutMilk')}
    </Question>
    <Plain type="button" onClick={props.onAgain}>
      {t('steps.again')}
    </Plain>
  </Screen>
));

export const Steps = component(() => {
  const step = signal<Step>('strength');
  const strength = signal<Strength>('light');
  const milk = signal(false);

  return () => {
    // Ordinary control flow, in a scope that runs again — and a local to put
    // the answer in, which markup has nowhere to keep.
    let screen: View;
    switch (step.value) {
      case 'strength':
        screen = (
          <AskStrength
            chosen={strength.value}
            onPick={(picked) => {
              strength.value = picked;
              step.value = 'milk';
            }}
          />
        );
        break;

      case 'milk':
        screen = (
          <AskMilk
            onPick={(wanted) => {
              milk.value = wanted;
              step.value = 'ready';
            }}
            onBack={() => {
              step.value = 'strength';
            }}
          />
        );
        break;

      default:
        screen = (
          <Ready
            strength={strength.value}
            milk={milk.value}
            onAgain={() => {
              step.value = 'strength';
            }}
          />
        );
    }

    return <Panel>{screen}</Panel>;
  };
});
