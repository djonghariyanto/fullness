import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, map } from 'rxjs/operators';
import { Store } from '@/store';

const fromLoadingState: <T>(fn: (loading: boolean) => T) => (state: Store) => Observable<(render: T) => T> = (fn) =>
  ({ state }: Store) => {
    return state
      .pipe(
        map(state => state.status),
        distinctUntilKeyChanged('loading'),
        map(status => (render: any) => ({
          ...render,
          ...fn(status.loading)
        }))
      );
  }

export default fromLoadingState;
