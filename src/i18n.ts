/**
 * Translations, made reactive.
 *
 * i18next does the translating; `fromI18next` is what tells the reactive graph
 * that the answer changed. Without it a label rendered before a language
 * switch would keep its old text, because a component runs once.
 *
 * `t` keeps i18next's own types. Add a `resources` type declaration and the
 * keys autocomplete — nothing here stands between you and the library.
 */
import i18next from 'i18next';
import { fromI18next } from '@firsthandjs/i18n';

const resources = {
  en: {
    translation: {
      nav: { home: 'Home', about: 'About' },
      home: {
        title: 'A quiet place to start',
        lead: 'Two pages, a router, styles, translations and a query cache — wired up and no larger than it needs to be.',
        body: 'Everything you see is a component that ran once. Nothing re-renders: the parts that read a signal update, and the rest of the page is never touched again. Switch the language in the corner and watch which words change.',
        aside: 'Delete what you do not need. That is what a starting point is for.',
      },
      about: {
        title: 'What is in the box',
        lead: 'Five packages, chosen because most applications reach for them on the first day.',
        items: {
          router: 'Typed routes, links and on-demand chunks.',
          styled: 'Styles next to the component, compiled once per template.',
          i18n: 'Any translation function, made reactive. This page is written in it.',
          query: 'A tag-based cache for REST and GraphQL, provided and waiting.',
          devtools: 'See what updates what. Development only — press Ctrl+Shift+F.',
        },
        footer: 'The framework itself is @firsthandjs/dom, and it is the only runtime dependency the others share.',
      },
      language: 'Deutsch',
    },
  },
  de: {
    translation: {
      nav: { home: 'Start', about: 'Über' },
      home: {
        title: 'Ein ruhiger Anfang',
        lead: 'Zwei Seiten, ein Router, Styles, Übersetzungen und ein Query-Cache — verdrahtet und keinen Deut größer als nötig.',
        body: 'Alles hier ist eine Komponente, die einmal gelaufen ist. Nichts rendert neu: es aktualisieren sich die Stellen, die ein Signal lesen, der Rest der Seite wird nie wieder angefasst. Wechsle oben rechts die Sprache und sieh zu, welche Wörter sich ändern.',
        aside: 'Lösche, was du nicht brauchst. Dafür ist ein Startpunkt da.',
      },
      about: {
        title: 'Was drin ist',
        lead: 'Fünf Pakete, ausgewählt, weil die meisten Anwendungen am ersten Tag danach greifen.',
        items: {
          router: 'Typisierte Routen, Links und Code, der erst bei Bedarf geladen wird.',
          styled: 'Styles neben der Komponente, einmal pro Template übersetzt.',
          i18n: 'Jede Übersetzungsfunktion, reaktiv gemacht. Diese Seite ist darin geschrieben.',
          query: 'Ein Cache über Tags für REST und GraphQL, bereitgestellt und wartend.',
          devtools: 'Sehen, was was aktualisiert. Nur in der Entwicklung — Strg+Umschalt+F.',
        },
        footer: 'Das Framework selbst ist @firsthandjs/dom, und es ist die einzige Laufzeit-Abhängigkeit, die sich die anderen teilen.',
      },
      language: 'English',
    },
  },
};

await i18next.init({ lng: 'en', fallbackLng: 'en', resources, interpolation: { escapeValue: false } });

export const { t, language } = fromI18next(i18next);

/** Switches between the two languages this starter ships with. */
export function toggleLanguage(): void {
  void i18next.changeLanguage(language.value === 'en' ? 'de' : 'en');
}
