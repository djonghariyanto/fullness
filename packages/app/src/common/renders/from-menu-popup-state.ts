import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, map } from 'rxjs/operators';
import { Store } from '@/store';
import { MenuPopup } from '@/store/state';

const fromMenuPopupState: <T>(fn: (session: [boolean, MenuPopup]) => T) => (state: Store) => Observable<(render: T) => T> = (fn) =>
  ({ state }: Store) => {
    return state
      .pipe(
        distinctUntilKeyChanged('menuPopup'),
        map(state => (render: any) => ({
          ...render,
          ...fn([state.status.hasMenuPopupActivated, state.menuPopup])
        }))
      );
  }

export default fromMenuPopupState;
