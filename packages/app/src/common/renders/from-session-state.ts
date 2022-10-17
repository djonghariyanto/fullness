import { Observable } from 'rxjs';
import { map, distinctUntilKeyChanged } from 'rxjs/operators';

import { Store } from '@/store';
import { Session } from '@/store/state';

const fromSessionState: <T>(fn: (session: [boolean, Session]) => Partial<T>) => (state: Store) => Observable<(render: T) => T> = (fn) =>
  ({ state }: Store) => state
    .pipe(
      distinctUntilKeyChanged('session'),
      map(state => (render: any) => ({
        ...render,
        ...fn([state.status.authenticatedSession, state.session])
      }))
    );

export default fromSessionState;

