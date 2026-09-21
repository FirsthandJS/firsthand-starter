/**
 * The home page: some text, and a counter to make the text demonstrable.
 *
 * Every `t(...)` here is a part of its own. Switching the language re-runs
 * those four reads and touches nothing else — not the counter's number, and
 * not the DOM around it.
 */
import { component } from '@firsthandjs/dom';
import { t } from '../setup/i18n';
import { Counter } from '../components/counter';
import { Facts } from '../components/facts';
import { Aside, Body, Lead, Title } from './home.styled';

export const Home = component(() => (
  <article>
    <Title>{t('home.title')}</Title>
    <Lead>{t('home.lead')}</Lead>
    <Counter />
    <Facts />
    <Body>{t('home.body')}</Body>
    <Aside>{t('home.aside')}</Aside>
  </article>
));
