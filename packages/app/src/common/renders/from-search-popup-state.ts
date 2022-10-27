import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, map } from 'rxjs/operators';
import { Store } from '@/store';
import { SearchPopup } from '@/store/state';

const fromSearchPopupState: <T>(fn: (session: [boolean, SearchPopup]) => T) => (state: Store) => Observable<(render: T) => T> = (fn) =>
  ({ state }: Store) => {
    return state
      .pipe(
        distinctUntilKeyChanged('searchPopup'),
        map(state => (render: any) => ({
          ...render,
          ...fn([state.status.hasSearchPopupActivated, state.searchPopup])
        }))
      );
  }

export default fromSearchPopupState;
