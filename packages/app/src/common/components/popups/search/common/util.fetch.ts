import { from, pipe, map, filter, exhaustMap } from 'rxjs';
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
  filter(sanitized => sanitized.length > 0),
  map(unsanitized => dompurify.sanitize(unsanitized)),
  exhaustMap((sanitized) => fromFetch(`https://localhost:7138/keyword?search=${sanitized}`, createRequest({ search: sanitized }))),
  exhaustMap(response => from(response.json())),
  map(({ payload }) => payload.length
    ? updateResultTerm([initialTerm, ...payload.map(tag => tag.id)])
    : updateResultTerm([])
  )
);

export default fetchSearch;
