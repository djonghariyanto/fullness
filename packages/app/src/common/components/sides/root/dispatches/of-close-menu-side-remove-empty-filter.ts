import { map, withLatestFrom, filter } from 'rxjs/operators';

import { Store, ofType } from '@/store';

import { toggleMenuSide, removeEmptyFilter } from '@/store/action';

const ofCloseMenuSideRemoveEmptyFilter = () =>
  ({ state, action }: Store) => {
    const activated$ = state
      .pipe(
        map(state => state.status.hasMenuSideActivated)
      );

    return action
      .pipe(
        ofType(toggleMenuSide),
        withLatestFrom(activated$),
        filter(([, activated]) => !activated),
        map(() => removeEmptyFilter())
      );
  }

export default ofCloseMenuSideRemoveEmptyFilter;
