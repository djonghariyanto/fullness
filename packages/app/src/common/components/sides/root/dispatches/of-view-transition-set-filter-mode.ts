import { filter, map, merge } from 'rxjs';

import { Store, ofType } from '@/store';

import { nextInTransitionView, previousInTransitionView, setStatus } from '@/store/action';
import { rootSideMenuId } from '@/common/components/sides/root';

const ofViewTransitionSetFilterMode = () =>
  ({ action }: Store) => {
    const next$ = action
      .pipe(
        ofType(nextInTransitionView),
        filter(({ id }) => id === rootSideMenuId),
        map(() => 'edit'),
      ),
      prev$ = action
        .pipe(
          ofType(previousInTransitionView),
          filter(({ id }) => id === rootSideMenuId),
          map(() => 'view'),
        );

    return merge(prev$, next$)
      .pipe(
        map((filterMode: "view" | "edit") => setStatus({ filterMode })),
      );
  }

export default ofViewTransitionSetFilterMode;
