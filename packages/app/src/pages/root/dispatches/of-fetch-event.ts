import { fromFetch } from 'rxjs/fetch';
import { map, of, EMPTY, withLatestFrom, iif, switchMap } from 'rxjs';
import { Store, ofType } from '@/store';
import { fetchEvent, updateEvent } from '@/store/action';

// todo
const setOptions = (filter: { dates: string[], categories: string[] }) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(filter)
});

const ofFetchEvent = () =>
  ({ action, state }: Store) => {
    const filter$ = state
      .pipe(
        map(state => state.filters)
      ),
      getFilterByIndex = (index: number) => of(index)
        .pipe(
          withLatestFrom(filter$),
          map(([index, filters]) => filters[index]),
          map(filter => ({
            dates: filter?.dates.map(date => date.id),
            categories: filter?.categories.map(category => category.id.toLowerCase()),
            matchAll: filter?.matchAll ? 1 : 0
          }))
        );

    return action
      .pipe(
        ofType(fetchEvent),
        switchMap(payload => iif(
          () => payload !== undefined && payload !== null,
          getFilterByIndex((<{ index: number }>payload)?.index),
          of({ dates: [], categories: [], matchAll: 0 })
        )),
        switchMap(filter => fromFetch('https://localhost:7138/fetch', setOptions(filter))),
        switchMap(response => response.json()),
        switchMap(response => iif(
          () => response.payload.length > 0,
          of(updateEvent(response.payload)),
          EMPTY
        ))
      );
  }

export default ofFetchEvent;
