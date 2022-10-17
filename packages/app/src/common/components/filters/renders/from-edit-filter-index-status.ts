import { Observable, combineLatest  } from 'rxjs';
import { map, distinctUntilKeyChanged,tap } from 'rxjs/operators';
import { Filter } from '@/store/state';

import { Store } from '@/store';

const fromEditFilterIndexStatus: <T>(fn: (filters: [Filter[], number]) => Partial<T>) => <T>(state: Store) => Observable<(render: T) => T> = (fn) =>
  <T>({ state }: Store) => {
    const filters$ = state
      .pipe(
        distinctUntilKeyChanged('filters'),
        map(state => state.filters)
      ),
      edit$ = state
        .pipe(
          map(state => state.status),
          distinctUntilKeyChanged('editFilterIndex'),
          map(status => status.editFilterIndex)
        );

    return combineLatest([filters$, edit$])
      .pipe(
        map(([filters, editFilterIndex]) => (render: T) => ({
          ...render,
          ...fn([filters, editFilterIndex])
        }))
      );
  }

export default fromEditFilterIndexStatus;
