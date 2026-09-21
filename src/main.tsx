/**
 * Everything this application is set up with, in one place.
 *
 * There is no provider tower: `provide` is called in the component that owns
 * the value, and `useContext` finds it through the owner tree. Three things
 * are provided here because three things are application-wide — the theme,
 * the data store and the routes.
 */
import './setup/devtools';

import { component, provide, render, signal } from '@firsthandjs/dom';
import { Router, route } from '@firsthandjs/router';
import { DataContext, createData } from '@firsthandjs/data';
import { ThemeContext } from '@firsthandjs/styled';
import { Shell } from './shell/shell';
import { Home } from './pages/home';
import { About } from './pages/about';
import { theme } from './setup/theme';

const Root = component(() => {
  // A signal, not a constant: assigning a new object here restyles everything
  // that reads the theme, which is how a dark mode would be added.
  provide(ThemeContext, signal(theme));

  // The store holds resources and matches invalidation patterns against their
  // tags. It is not a cache — that is the client's, in `setup/api.ts`, because
  // knowing when two requests are the same thing is a transport's job.
  //
  //   const facts = useResource(({ request, tags }) => { … });
  //   await useInvalidate()(tag('facts'));
  provide(DataContext, createData());

  // `route()` reads each path for its parameters and hands a child builder
  // down, so a nested route is typed without declaring anything twice.
  const routes = [
    route({
      path: '/',
      component: Shell,
      children: (child) => [
        child({ index: true, component: Home }),
        child({ path: 'about', component: About }),
        // Anything else lands on the home page. A real application would put
        // a 404 here instead.
        child({ path: '*', component: Home }),
      ],
    }),
  ];

  return <Router routes={routes} />;
});

render(() => <Root />, document.getElementById('root') as HTMLElement);
