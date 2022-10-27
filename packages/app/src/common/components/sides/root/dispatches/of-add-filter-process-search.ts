import { switchMap, EMPTY, of, iif, map, withLatestFrom } from 'rxjs';
import { Store, ofType } from '@/store';
import { setFilter, addFilter } from '@/store/action';

const ofAddFilterProcessSearch = () =>
  ({ action, state }: Store) => {
    const filter$ = state
      .pipe(
        map(state => state.filters[state.status.editFilterIndex]),
        map(filters => filters === undefined ? [] : filters.categories),
      );

    return action
      .pipe(
        ofType(addFilter),
        withLatestFrom(filter$),
        switchMap(([payload, categories]) => iif(
          () => categories.find(category => category.id === payload.id) !== undefined,
          EMPTY,
          of({ categories: [...categories, payload] })
        )),
        map(setFilter)
      );
  }

export default ofAddFilterProcessSearch;
