import { filter, tap, map, withLatestFrom } from 'rxjs';
import { Store, ofType } from '@/store';
import { subStore } from '@/store/action';
import { escapeInput } from '../store';

const ofSubStoreBlurInput = () =>
  ({ action, state }: Store) => {
    const input$ = state
      .pipe(
        map(state => state.searchPopup?.inputRef)
      );
    return action
      .pipe(
        ofType(subStore),
        filter(sub => sub.type === escapeInput),
        withLatestFrom(input$),
        filter(([, ref]) => ref === (<HTMLInputElement>document.activeElement)),
        tap(([{ payload: e }]) => (<Event>e).preventDefault()),
        tap(() => (<HTMLInputElement>document.activeElement)?.blur())
      );
  }

export default ofSubStoreBlurInput;
