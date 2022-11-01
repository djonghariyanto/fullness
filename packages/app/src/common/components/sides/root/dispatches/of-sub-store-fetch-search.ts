import { filter, sample, map } from 'rxjs';
import { Store, ofType } from '@/store';
import { subStore, fetchSearchTerm } from '@/store/action'
import { openPopup } from '../store';

const ofSubStoreFetchSearch = () =>
  ({ action, state }: Store) => {
    const sub$ = action
      .pipe(
        ofType(subStore),
        filter(sub => sub.type === openPopup)
      );

    return state
      .pipe(
        map(state => state.searchPopup),
        sample(sub$),
        filter((search) => document.activeElement === search?.inputRef && search.result?.length > 0),
        map(() => fetchSearchTerm())
      );
  }

export default ofSubStoreFetchSearch;
