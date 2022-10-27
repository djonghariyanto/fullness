import { map, take, exhaustMap, from } from 'rxjs';

import { Store } from '@/store';
import { Status } from '@/store/state';
import { setTransitionViewIndex, setStatus } from '@/store/action';
import { rootSideMenuId } from '../';

const onInit = () =>
  ({ state }: Store) => {
    return state
      .pipe(
        map(state => state.filters.length),
        map(count => count === 0
          ? [{ id: rootSideMenuId, index: 2 }, { filterMode: 'edit' }]
          : [{ id: rootSideMenuId, index: 1 }, { filterMode: 'view' }]
        ),
        exhaustMap(([ payload, status ]: [{ id: string, index: number }, Status]) => from([
          setTransitionViewIndex(payload),
          setStatus(status)
        ])),
        take(2)
      );
  }

export default onInit;
