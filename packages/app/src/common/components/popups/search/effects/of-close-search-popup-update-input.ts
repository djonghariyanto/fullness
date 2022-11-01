import { tap, sample, map } from 'rxjs';
import { Store, ofType } from '@/store';
import { closeSearchPopup } from '@/store/action';

const ofCloseSearchPopupUpdateInput = () =>
  ({ state, action }: Store) => {
    const close$ = action
      .pipe(
        ofType(closeSearchPopup)
      );

    return state
      .pipe(
        map(state => state.searchPopup),
        sample(close$),
        tap(search => (<HTMLInputElement>search.inputRef).value = search.result[0])
      );
  }

export default ofCloseSearchPopupUpdateInput;
