import { from, pipe, map, EMPTY, tap, switchMap, exhaustMap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { updateResultTerm } from '@/store/action';
import * as dompurify from 'dompurify';

const createRequest = (term: { search: string }) => {
  return <RequestInit>{
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(term)
  }
}

const fetchSearch = (initialTerm: string) => pipe(
  map((term: string) => term.replace(/[^a-zA-Z0-9]/g, '')),
  map(unsanitized => dompurify.sanitize(unsanitized)),
  exhaustMap((sanitized) => fromFetch(`https://localhost:7138/keyword?search=${sanitized}`, createRequest({ search: sanitized }))),
  exhaustMap(response => from(response.json())),
  map(({ payload }) => payload.length
    ? updateResultTerm([initialTerm, ...payload.map(tag => tag.id)])
    : updateResultTerm([])
  )
);

export default fetchSearch;
/*
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
  */
