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
        lead: 'Two pages, a router, styles and translations — wired up and no larger than it needs to be.',
        body: 'The counter is the shortest honest demonstration. Its number is a signal, the word beside it is derived from that signal, and the time is read once while the component is set up. Click as long as you like: the number moves, the time does not, and no other word on this page is touched. Switch the language in the corner to see which parts read a translation.',
        aside: 'Delete what you do not need. That is what a starting point is for.',
      },
      steps: {
        strength: 'How strong?',
        light: 'Light',
        strong: 'Strong',
        milk: 'Milk?',
        yes: 'Please',
        no: 'No thank you',
        back: 'Back',
        lightTea: 'Light tea, ',
        strongTea: 'Strong tea, ',
        withMilk: 'with milk.',
        withoutMilk: 'no milk.',
        again: 'Start again',
      },
      counter: {
        even: 'even',
        odd: 'odd',
        increment: 'Increase',
        decrement: 'Decrease',
        reset: 'Reset',
        note: 'This component ran once, at {{time}}, and has not run since. Only the parts that read the signal update.',
      },
      about: {
        title: 'What is in the box',
        lead: 'Four packages, chosen because most applications reach for them on the first day.',
        items: {
          router: 'Typed routes, links and on-demand chunks.',
          styled: 'Styles next to the component, compiled once per template.',
          i18n: 'Any translation function, made reactive. This page is written in it.',
          devtools: 'See what updates what. Development only — press Ctrl+Shift+F.',
        },
        footer:
          'The framework itself is @firsthandjs/dom, and it is the only runtime dependency the others share.',
      },
      language: 'Deutsch',
    },
  },
  de: {
    translation: {
      nav: { home: 'Start', about: 'Über' },
      home: {
        title: 'Ein ruhiger Anfang',
        lead: 'Zwei Seiten, ein Router, Styles und Übersetzungen — verdrahtet und keinen Deut größer als nötig.',
        body: 'Der Zähler ist die kürzeste ehrliche Vorführung. Seine Zahl ist ein Signal, das Wort daneben wird daraus abgeleitet, und die Uhrzeit wird einmal gelesen, während die Komponente aufgebaut wird. Klick so lange du magst: die Zahl bewegt sich, die Uhrzeit nicht, und kein anderes Wort dieser Seite wird angefasst. Wechsle oben rechts die Sprache, um zu sehen, welche Stellen eine Übersetzung lesen.',
        aside: 'Lösche, was du nicht brauchst. Dafür ist ein Startpunkt da.',
      },
      steps: {
        strength: 'Wie stark?',
        light: 'Leicht',
        strong: 'Stark',
        milk: 'Milch?',
        yes: 'Gerne',
        no: 'Nein danke',
        back: 'Zurück',
        lightTea: 'Leichter Tee, ',
        strongTea: 'Starker Tee, ',
        withMilk: 'mit Milch.',
        withoutMilk: 'ohne Milch.',
        again: 'Nochmal',
      },
      counter: {
        even: 'gerade',
        odd: 'ungerade',
        increment: 'Erhöhen',
        decrement: 'Verringern',
        reset: 'Zurücksetzen',
        note: 'Diese Komponente lief einmal, um {{time}}, und seitdem nicht wieder. Es aktualisieren sich nur die Stellen, die das Signal lesen.',
      },
      about: {
        title: 'Was drin ist',
        lead: 'Vier Pakete, ausgewählt, weil die meisten Anwendungen am ersten Tag danach greifen.',
        items: {
          router: 'Typisierte Routen, Links und Code, der erst bei Bedarf geladen wird.',
          styled: 'Styles neben der Komponente, einmal pro Template übersetzt.',
          i18n: 'Jede Übersetzungsfunktion, reaktiv gemacht. Diese Seite ist darin geschrieben.',
          devtools: 'Sehen, was was aktualisiert. Nur in der Entwicklung — Strg+Umschalt+F.',
        },
        footer:
          'Das Framework selbst ist @firsthandjs/dom, und es ist die einzige Laufzeit-Abhängigkeit, die sich die anderen teilen.',
      },
      language: 'English',
    },
  },
};

await i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  resources,
  interpolation: { escapeValue: false },
});

export const { t, language } = fromI18next(i18next);

/** Switches between the two languages this starter ships with. */
export function toggleLanguage(): void {
  void i18next.changeLanguage(language.value === 'en' ? 'de' : 'en');
}
