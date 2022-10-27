import { filter, map, sample } from 'rxjs';
import { Store, ofType } from '@/store';
import { addFilter, subStore } from '@/store/action';
import { commitValue } from '@/common/components/input-texts/search';

const ofCommitSubStoreAddFilter = () =>
  ({ state, action }: Store) => {
    const commit$ = action 
      .pipe(
        ofType(subStore),
        filter(sub => sub.type === commitValue)
      );

    return state
      .pipe(
        filter(state => (<HTMLElement>state.searchPopup?.inputRef) === (<Document>document).activeElement),
        map(state => (<HTMLInputElement>state.searchPopup.inputRef).value),
        filter(value => value.length > 0),
        sample(commit$),
        map(value => addFilter({
          id: value,
          display: value
        }))
      );
  }

export default ofCommitSubStoreAddFilter;
