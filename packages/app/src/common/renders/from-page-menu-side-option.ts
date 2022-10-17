import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, map } from 'rxjs/operators';
import { Store } from '@/store';
import { isMenuSideAccessible } from '@/pages';

const fromPageMenuSideOption: <T>(fn: (isAccessible: boolean) => Partial<T>) => (state: Store) => Observable<(render: T) => T> = (fn) =>
  ({ state }: Store) => {
    return state
      .pipe(
        map(state => state.status),
        distinctUntilKeyChanged('currentPage'),
        map(state => (render: any) => ({
          ...render,
          ...fn(isMenuSideAccessible(state.currentPage))
        }))
      );
  }

export default fromPageMenuSideOption;
