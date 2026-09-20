/**
 * The home page.
 *
 * Four elements, all text. Each `t(...)` is a part of its own: switching the
 * language re-runs those four reads and touches nothing else on the page.
 */
import { component } from '@firsthandjs/dom';
import { t } from '../i18n';
import { Aside, Body, Lead, Title } from './home.styled';

export const Home = component(() => (
  <article>
    <Title>{t('home.title')}</Title>
    <Lead>{t('home.lead')}</Lead>
    <Body>{t('home.body')}</Body>
    <Aside>{t('home.aside')}</Aside>
  </article>
));
