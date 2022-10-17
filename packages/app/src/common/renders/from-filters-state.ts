import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, map } from 'rxjs/operators';
import { Store } from '@/store';
import { Filter } from '@/store/state';

const fromFilterState: <T>(fn: (session: [Filter[], number]) => Partial<T>) => (state: Store) => Observable<(render: T) => T> = (fn) =>
  ({ state }: Store) => {
    return state
      .pipe(
        distinctUntilKeyChanged('filters'),
        map(state => (render: any) => ({
          ...render,
          ...fn([state.filters, state.status.editFilterIndex])
        }))
      );
  }

export default fromFilterState;
