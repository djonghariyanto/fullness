import { filter, sample, map, distinctUntilKeyChanged } from 'rxjs';
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
        map(state => state.searchPopup?.inputRef),
        sample(sub$),
        filter((ref: HTMLInputElement) => document.activeElement === ref),
        distinctUntilKeyChanged('value'),
        map(() => fetchSearchTerm())
      );
  }

export default ofSubStoreFetchSearch;
