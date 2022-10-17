import { map, first } from 'rxjs/operators';

import { Store } from '@/store';
import { setTransitionViewIndex } from '@/store/action';
import { rootSideMenuId } from '../';

const onInit = () =>
  ({ state }: Store) => {
    return state
      .pipe(
        map(state => state.filters.length),
        map(count => count === 0
          ? { id: rootSideMenuId, index: 2 }
          : { id: rootSideMenuId, index: 1 }
        ),
        map(setTransitionViewIndex),
        first()
      );
  }

export default onInit;
