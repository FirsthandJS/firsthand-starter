/**
 * The about page: what the starter ships with, and why.
 *
 * The list is keyed, so a language change updates the two text parts of each
 * row and leaves the rows themselves — their DOM nodes and their state — where
 * they are. With five static entries that is invisible; with five hundred
 * rows of live data it is the whole difference.
 */
import { component } from '@firsthandjs/dom';
import { t } from '../setup/i18n';
import { Footer, Lead, List, Package, Title, What } from './about.styled';

const packages = ['router', 'styled', 'i18n', 'data', 'devtools'] as const;

export const About = component(() => (
  <article>
    <Title>{t('about.title')}</Title>
    <Lead>{t('about.lead')}</Lead>
    <List>
      {packages.map((name) => (
        <div key={name}>
          <Package>@firsthandjs/{name}</Package>
          <What>{t(`about.items.${name}`)}</What>
        </div>
      ))}
    </List>
    <Footer>{t('about.footer')}</Footer>
  </article>
));
