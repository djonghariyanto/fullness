import { fromFetch } from 'rxjs/fetch';
import { from } from 'rxjs';
import { filter, exhaustMap, first, map } from 'rxjs/operators';
import { Store } from '@/store';
import { endAuthenticatedSession } from '@/store/action';

const createRequest = () => {
  return <RequestInit>{
    method: 'GET',
    credentials: 'include'
  }
}

const signoutUser = () =>
  ({ state }: Store) => {
    const fetch$ = fromFetch('https://localhost:7138/logout', createRequest())
      .pipe(
        exhaustMap(response => from(response.json()))
      );

    return state
      .pipe(
        filter(state => state.status.authenticatedSession),
        exhaustMap(() => fetch$),
        filter(response => response.ack),
        map(() => endAuthenticatedSession()),
        first()
      );
  }

export default signoutUser;
