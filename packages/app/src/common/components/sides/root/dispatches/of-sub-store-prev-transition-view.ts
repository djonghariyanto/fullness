import { filter, tap, map, withLatestFrom } from 'rxjs';
import { Store, ofType } from '@/store';
import { subStore, previousInTransitionView } from '@/store/action';
import { escapeInput } from '../store';
import { rootSideMenuId } from '../';

const ofSubStorePrevTransitionView = () =>
  ({ action, state }: Store) => {
    const mode$ = state
      .pipe(
        map(state => [state.status.filterMode, state.searchPopup?.inputRef])
      );

    return action
      .pipe(
        ofType(subStore),
        filter(sub => sub.type === escapeInput && !(<Event>sub.payload).defaultPrevented),
        withLatestFrom(mode$),
        filter(([, [mode, ref]]) => mode === 'edit' && ref !== document.activeElement),
        tap(([{ payload: e }]) => (<Event>e).preventDefault()),
        map(() => previousInTransitionView({ id: rootSideMenuId }))
      );
  }

export default ofSubStorePrevTransitionView;
