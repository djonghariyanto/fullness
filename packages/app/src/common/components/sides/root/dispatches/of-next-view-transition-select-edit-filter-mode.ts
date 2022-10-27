import { filter, withLatestFrom, map } from 'rxjs';

import { Store, ofType } from '@/store';

import { nextInTransitionView, editFiltersByIndex } from '@/store/action';
import { rootSideMenuId } from '@/common/components/sides/root';

const ofNextViewTransitionSelectEditFilterMode = () =>
  ({ state, action }: Store) => {
    const filters$ = state
      .pipe(
        map(state => state.filters)
      );

    return action
      .pipe(
        ofType(nextInTransitionView),
        filter(({ id }) => id === rootSideMenuId),
        withLatestFrom(filters$),
        map(([{ payload }, filters]) => payload === undefined
          ? ['insert', filters.length]
          : ['update', payload]
        ),
        map(editFiltersByIndex)
      );
  }

export default ofNextViewTransitionSelectEditFilterMode;
