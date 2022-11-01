import { map, filter, merge, tap, sample } from 'rxjs';
import { Store, ofType } from '@/store';
import { subStore, gotoSearchResultIndex } from '@/store/action';
import { nextSearchResultIndex, prevSearchResultIndex } from '../store';

const ofSubStoreProcessAction = () =>
  ({ action, state }: Store) => {
    const prev$ = action
      .pipe(
        ofType(subStore),
        filter(sub => sub.type === prevSearchResultIndex)
      ),
      next$ = action
        .pipe(
          ofType(subStore),
          filter(sub => sub.type === nextSearchResultIndex)
        ),
      dec$ = state
        .pipe(
          map(state => state.searchPopup),
          sample(prev$),
          filter(({ result }) => result?.length > 0),
          map(({ index, result }) => ((index.curr + result.length) - 1) % (result.length))
        ),
      inc$ = state
        .pipe(
          map(state => state.searchPopup),
          sample(next$),
          filter(({ result }) => result?.length > 0),
          map(({ index, result }) => ((index.curr + 1) % (result.length)))
        );

    return merge(dec$, inc$)
      .pipe(
        map(index => gotoSearchResultIndex({ index: index, shouldUpdate: true }))
      );
  }

export default ofSubStoreProcessAction;
