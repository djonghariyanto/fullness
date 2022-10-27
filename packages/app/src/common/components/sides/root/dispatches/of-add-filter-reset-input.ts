import { map, sample, tap } from 'rxjs';
import { Store, ofType } from '@/store';
import { addFilter, fetchSearchTerm } from '@/store/action';

const ofAddFilterResetInput = () =>
  ({ action, state }: Store) => {
    const add$ = action
      .pipe(
        ofType(addFilter)
      );

    return state
      .pipe(
        map(state => state.searchPopup?.inputRef),
        sample(add$),
        tap(search => (<HTMLInputElement>search).value = ""),
        map(() => fetchSearchTerm())
      );
  }

export default ofAddFilterResetInput;
