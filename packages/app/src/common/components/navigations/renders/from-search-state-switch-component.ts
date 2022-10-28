import { Observable, map, distinctUntilKeyChanged, withLatestFrom } from 'rxjs';
import { Store } from '@/store';

const fromSearchStateSwitchComponent: <T>(Login: React.ReactElement, Signup: React.ReactElement) => (store: Store) => Observable<(render: T) => T> = (Login, Signup) =>
  ({ state }: Store) => {
    const search$ = state
      .pipe(
        map(state => state.search)
      );

    return state
      .pipe(
        map(state => state.status),
        distinctUntilKeyChanged('currentPage'),
        withLatestFrom(search$),
        map(([ status, search ]) => (render: any) => ({
          ...render,
          Button:
            status.currentPage === 'Login' || search === '?signup' ? Signup : Login
        }))
      );
  }

export default fromSearchStateSwitchComponent;
