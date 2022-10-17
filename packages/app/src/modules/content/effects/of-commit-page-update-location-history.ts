import { tap, map, withLatestFrom } from 'rxjs/operators';

import { Store, ofType } from '@/store';
import { commitPage } from '@/store/action';
import { toPathname } from '@/pages';

type CommitPage = Parameters<typeof commitPage>[0];

const ofCommitPageUpdateLocationHistory = () =>
  ({ state, action }: Store) => {
    const historyAction$ = state
      .pipe(
        map(state => state.status.historyAction)
      ),
      search$ = state
        .pipe(
          map(state => state.search)
        );

    return action
      .pipe(
        ofType<CommitPage>(commitPage),
        map(({ page }) => toPathname(page) ?? location.pathname),
        withLatestFrom(search$, historyAction$),
        tap(([pathname, search, historyAction]) => historyAction === 'push'
          ? history.pushState({ pathname, search }, '', `${pathname}${search}`)
          : history.replaceState({ pathname, search }, '', `${pathname}${search}`)
        )
      );
  }

export default ofCommitPageUpdateLocationHistory;
