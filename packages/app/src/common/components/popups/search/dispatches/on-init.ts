import { map, switchMap, merge, sample, of, iif } from 'rxjs';
import { Store, ofType } from '@/store';
import { closeSearchPopup, fetchSearchTerm } from '@/store/action';
import fetchSearch from '../common/util.fetch';

const onInit = () =>
  ({ state, action }: Store) => {
    const fetch$ = merge(
      of(true),
      action.pipe(ofType(fetchSearchTerm))
    );

    return state
      .pipe(
        map(state => state.searchPopup),
        sample(fetch$),
        map(search => (<HTMLInputElement>search.inputRef).value),
        switchMap(term => iif(
          () => term.length > 0,
          of(term)
            .pipe(
              fetchSearch(term)
            ),
          of(closeSearchPopup())
        ))
      );
  }

export default onInit;
