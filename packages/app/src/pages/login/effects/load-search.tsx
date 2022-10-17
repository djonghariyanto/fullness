import * as React from 'react';
import { merge } from 'rxjs';
import { map, withLatestFrom, first, filter } from 'rxjs/operators';
import { Store, ofType } from '@/store';
import { commitPage, activateDialog } from '@/store/action';
import SignupForm from '@/common/components/signup-form';

type CommitPage = Parameters<typeof commitPage>[0];

const loadSearchEffect = () =>
  ({ state, action }: Store) => {
    const search$ = state
      .pipe(
        map(state => state.search)
      ),
      init$ = state
        .pipe(
          map(state => state.status.currentPage),
          map(page => ({ page })),
          first(),
        ),
      action$ = action
        .pipe(
          ofType<CommitPage>(commitPage),
        );

    return merge(init$, action$)
      .pipe(
        withLatestFrom(search$),
        filter(([{ page }, search]) => page === 'Login' && search === '?signup'),
        map((): { Component: React.ReactElement } => ({
          Component: <SignupForm />
        })),
        map(activateDialog)
      );
  }

export default loadSearchEffect;

