import { fromFetch } from 'rxjs/fetch';
import { EMPTY, Observable, merge, from } from 'rxjs';
import { map, exhaustMap, connect, withLatestFrom, first } from 'rxjs/operators';
import { ofType, Store } from '@/store';
import { loadPath, commitPage, startAuthenticatedSession } from '@/store/action';
import { toPage, HistoryAction } from '@/pages';
import { Session } from '@/store/state';

const createRequest = (pathname: string) => {
  return <RequestInit>{
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pathname })
  }
}

const ofLoadPathDoVerifyPath = () =>
  ({ action }: Store) => {
    const pathname$ = action
      .pipe(
        ofType<{ pathname: string, historyAction?: HistoryAction, search?: string }>(loadPath),
      ),
      initSession = (obs: Observable<any>) => merge(
        obs.pipe(
          map(response => <Session>response.payload.session),
          map(startAuthenticatedSession)
        ),
        EMPTY
      ).pipe(
        first(),
      ),
      commitPage$ = (obs: Observable<any>) => obs
        .pipe(
          withLatestFrom(pathname$),
          map(([response, { pathname }]) => response.ack
            ? response.payload.authorized
              ? commitPage({ page: toPage(pathname) })
              : commitPage({ page: "Login", historyAction: "replace" })
            : commitPage({ page: null })
          )
        );

    return pathname$
      .pipe(
        exhaustMap(({ pathname }) => fromFetch('https://localhost:7138/verify', createRequest(pathname))),
        exhaustMap(response => from(response.json())),
        connect(shared$ => merge(
          commitPage$(shared$),
          initSession(shared$)
        ))
      );
  }

export default ofLoadPathDoVerifyPath;
