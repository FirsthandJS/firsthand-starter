/**
 * Data that comes from outside the reactive graph, brought in as state.
 *
 * Signals cover what the application can work out for itself. This is the
 * other half: a value that is not there yet when the component runs. Here it
 * is a file over HTTP, because that is the commonest case — a worker, a
 * database or an expensive computation would read exactly the same.
 *
 * Three things are worth watching.
 *
 * **The loader gets a request, and hands it to the client.** `{ signal, force }`
 * is the whole contract between the reactivity layer and the transport: what
 * to abort with, and whether the answer may come out of the cache.
 *
 * **Nothing here is a cache.** The resource holds state; `api` holds the
 * memory. Leaving this page and coming back within the client's lifetime
 * costs no request — and you can see that, because the answer's `generatedAt`
 * does not change.
 *
 * **Reloading reaches through it.** `invalidate(tag('facts'))` runs the loader
 * again with `force`, which drops the cache entry rather than being answered
 * out of it. That is the one place where the two layers touch.
 *
 * And the setup returns a **render function**, because this view has a choice
 * to make. A setup runs once, so a choice made in one is made for ever; the
 * arrow below is a reactive scope of its own, and may use an ordinary `if`.
 * The whole of it runs again when `status` changes — and writes into the nodes
 * it already made, rather than building them afresh. `failed` is a local of
 * that run, and the panel below it is kept: what the run has to say to it
 * travels through a cell, so the choice is made again and the component is
 * not (Firsthand 0.9.1 and later; before that the local was read once and the
 * failure could never appear).
 */
import { component } from '@firsthandjs/dom';
import { tag, useInvalidate, useResource } from '@firsthandjs/data';
import { api, type FactsResponse } from '../setup/api';
import { t } from '../setup/i18n';
import { Button, Fact, Failure, Header, Heading, List, Note, Panel } from './facts.styled';

export const Facts = component(() => {
  const facts = useResource(({ request, tags }) => {
    // What this resource is about. A mutation naming `facts` would reload it,
    // and this component would never hear about the mutation.
    tags(tag('facts'));
    return api.get<FactsResponse>('facts.json')(request);
  });

  const invalidate = useInvalidate();
  const reload = (): void => {
    void invalidate(tag('facts'));
  };

  return () => {
    const failed = facts.status.value === 'error';

    return (
      <Panel>
        <Header>
          <Heading>{t('facts.title')}</Heading>
          <Button type="button" disabled={facts.loading.value} onClick={reload}>
            {facts.loading.value ? t('facts.loading') : t('facts.reload')}
          </Button>
        </Header>

        {failed ? (
          <Failure>{t('facts.failed')}</Failure>
        ) : (
          // `loading` is true even while the previous answer is still on
          // screen, which is what `status` alone could not tell you.
          <List $stale={facts.loading.value}>
            {(facts.data.value?.facts ?? []).map((fact) => (
              <Fact key={fact}>{fact}</Fact>
            ))}
          </List>
        )}

        <Note>{t('facts.note')}</Note>
      </Panel>
    );
  };
});
