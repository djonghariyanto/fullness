import { from } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { filter, map, exhaustMap } from 'rxjs/operators';
import { Store } from '@/store';
import { LoginEntry } from '@/store/state';
import { throwAuthenticationError, startAuthenticatedSession } from '@/store/action';

const createRequest = (entry: LoginEntry) => {
  return <RequestInit>{
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: entry.username.value, password: entry.password.value })
  }
}

const submitEntry = () =>
  ({ state }: Store) => state
    .pipe(
      filter(state => state.status.submitEntry),
      exhaustMap(({ entry }: { entry: LoginEntry }) => fromFetch('https://localhost:7138/login', createRequest(entry))),
      exhaustMap(response => from(response.json())),
      map(response => response.ack
        ? startAuthenticatedSession(response.payload)
        : throwAuthenticationError()
      )
    );

export default submitEntry;
