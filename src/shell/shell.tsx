/**
 * The shell: a header that stays, and whatever the route puts below it.
 *
 * `Outlet` renders the matched child route. The header is built once and never
 * again — switching pages replaces only what is inside the `Outlet`, and
 * switching language re-reads only the words.
 */
import { component } from '@firsthandjs/dom';
import { Outlet } from '@firsthandjs/router';
import { t, toggleLanguage } from '../setup/i18n';
import { Brand, GlobalStyle, Header, LanguageButton, Main, Nav, Page, Tab } from './shell.styled';

export const Shell = component(() => (
  <Page>
    <GlobalStyle />
    <Header>
      <Brand>Firsthand</Brand>
      <Nav>
        <Tab to="/" end>
          {t('nav.home')}
        </Tab>
        <Tab to="/about">{t('nav.about')}</Tab>
      </Nav>
      <LanguageButton type="button" onClick={toggleLanguage}>
        {t('language')}
      </LanguageButton>
    </Header>
    <Main>
      <Outlet />
    </Main>
  </Page>
));
