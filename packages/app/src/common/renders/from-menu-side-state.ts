import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, withLatestFrom, map } from 'rxjs/operators';
import { Store } from '@/store';
import { MenuSide } from '@/store/state';

const fromMenuPopupState: <T>(fn: (session: [boolean, MenuSide]) => Partial<T>) => (state: Store) => Observable<(render: T) => T> = (fn) =>
  ({ state }: Store) => {
    const menuSide$ = state
      .pipe(
        map(state => state.menuSide)
      );

    return state
      .pipe(
        map(state => state.status),
        distinctUntilKeyChanged('hasMenuSideActivated'),
        withLatestFrom(menuSide$),
        map(([ status, menuSide ]) => (render: any) => ({
          ...render,
          ...fn([status.hasMenuSideActivated, menuSide])
        })),
      );
  }

export default fromMenuPopupState;
