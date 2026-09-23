# Firsthand starter

A small starting point for a [Firsthand](https://github.com/FirsthandJS/firsthand)
application: two pages, routed, styled, translated, with devtools already
wired up.

Deliberately small. Everything here is something you would otherwise set up on
the first day — and nothing else.

```bash
npm install
npm run dev
```

Then press **Ctrl+Shift+F** for the devtools panel.

## What is in it

| Package                 | What it does here                                               |
| ----------------------- | --------------------------------------------------------------- |
| `@firsthandjs/dom`      | Components, rendering, signals. The only runtime the rest share |
| `@firsthandjs/router`   | Two routes under one shell, typed                               |
| `@firsthandjs/styled`   | Every style in this project, beside the component it styles     |
| `@firsthandjs/i18n`     | Every word in this project, in two languages                    |
| `@firsthandjs/devtools` | Development only, behind a `import.meta.env.DEV` guard          |
| `@firsthandjs/compiler` | TSX into DOM instructions, at build time                        |
| `@firsthandjs/testing`  | Every test in this project, each beside the thing it tests      |

There is no React bridge. `@firsthandjs/react` exists for component libraries
that only ship for React — add it when you reach for one.

## What it weighs

The production build is 85.7 kB minified, 29.3 kB gzip — and **13.9 kB of that
gzip is i18next**, which is larger than the framework, the router, the styles
and the data layer put together. That is not a complaint about i18next; it is
a real translation library and this starter uses a fraction of it. But if your
application needs two languages and nothing more, a plain object and
`translator()` from `@firsthandjs/i18n` will do the same job for a few hundred
bytes.

Measured, not estimated: `npm run build`, and `esbuild` over i18next on its own.

## The shape of it

```
src/
  main.tsx                  the application: theme and routes
  setup/
    devtools.ts             devtools, first and development-only
    i18n.ts                 i18next, made reactive
    theme.ts                the theme, and the declaration that types it
  shell/
    shell.tsx               header, navigation, outlet
    shell.styled.tsx
  pages/
    home.tsx                one page
    home.styled.tsx
    home.test.tsx
    about.tsx               the other page
    about.styled.tsx
  components/
    counter.tsx             a signal, a computed, and three buttons
    counter.styled.tsx
    counter.test.tsx
    steps.tsx               three screens, and the function that chooses between them
    steps.styled.tsx
    steps.test.tsx
```

Three rules, and they are the whole convention:

- **One `.styled.tsx` beside every file that renders.** A component file reads
  as structure, the file beside it as appearance, and neither needs the other
  open.
- **A test sits beside what it tests**, not in a `__tests__` directory that
  mirrors the source and drifts from it.
- **`main.tsx` is the only file at the root**, because it is the only file that
  is about the application as a whole.

## Things worth knowing before you change it

**A component runs once.** Not once per update — once, ever, per instance.
The counter on the home page is the demonstration: its number changes, and the
timestamp beside it — read while the setup ran — never does. Read a signal
where you use it rather than into a `const` above; the compiler will tell you
if you forget.

**Devtools are imported first, and dynamically.** Imports are hoisted, so
`attach()` written among the imports of `main.tsx` would run after every one of
them and miss the names of anything created during that evaluation. The dynamic
import behind `import.meta.env.DEV` keeps the package out of your production
bundle — unlike the framework's own diagnostics, it is not stripped for you.

**The theme is a signal.** Assigning a new object restyles everything that
reads it, which is where a dark mode goes.

**A setup may return a function, and then it is a scope that runs again.**
That is what `components/steps.tsx` is for. Three screens, three components,
and an ordinary `switch` choosing between them — a choice a setup cannot make,
because a setup runs once. The answers live in signals of that setup, so
stepping back finds the earlier one still chosen: the screens are replaced and
the state behind them is not. Use it where a view has a genuine choice to
make; a single condition reads better in the markup, where it is a part of its
own.

**Event handlers get names.** Not for React's reason — a component runs once,
so an inline arrow is allocated once and costs nothing here. For the same
reason the `.styled.tsx` file exists: markup reads as structure, and
appearance and behaviour each live somewhere they can be named.

## Scripts

| Command           | What it does                    |
| ----------------- | ------------------------------- |
| `npm run dev`     | Vite, with the compiler plugin  |
| `npm run build`   | A production build into `dist/` |
| `npm run preview` | Serves that build               |
| `npm run check`   | `tsc --noEmit`                  |
| `npm test`        | Vitest                          |

## Documentation

The [guide](https://github.com/FirsthandJS/firsthand/blob/main/docs/guide/01-getting-started.md)
reads in order; the [reference](https://github.com/FirsthandJS/firsthand/blob/main/docs/README.md#reference)
is one page per package.

MIT licensed.
