/**
 * Devtools, started before the application builds anything — and only in dev.
 *
 * Its own module because imports are hoisted: `attach()` written among the
 * imports of `main.tsx` would run after every one of them had been evaluated,
 * and a cell created during that evaluation would be recorded without a name.
 * Imported first, this module is evaluated first, and the top-level `await`
 * holds the rest of the graph until devtools are listening.
 *
 * The import is dynamic and behind `import.meta.env.DEV` so that a production
 * build drops both the branch and the package. `@firsthandjs/devtools` ships
 * as one real build — unlike the framework's own diagnostics, which the
 * production build replaces with empty functions — so an unconditional import
 * would put the whole panel in your bundle.
 *
 * Ctrl+Shift+F opens the panel; `__FIRSTHAND__` in the console is the same
 * answers as data.
 */
if (import.meta.env.DEV) {
  const { attach } = await import('@firsthandjs/devtools');
  attach();
}
