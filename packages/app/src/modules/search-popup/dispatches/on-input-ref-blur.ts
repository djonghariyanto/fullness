import { map, fromEvent, audit, filter, switchMap, first } from 'rxjs';
import { Store } from '@/store';
import { closeSearchPopup } from '@/store/action';

const onInputRefBlur = () =>
  ({ state }: Store) => {
    const listenBlur = (ref: EventTarget & Element) => fromEvent(ref, 'blur')
      .pipe(
        audit(() => fromEvent(window, 'click'))
      );

    return state
      .pipe(
        filter(state => state.status.hasSearchPopupActivated),
        first(),
        switchMap(state => listenBlur(state.searchPopup.inputRef)),
        map(() => closeSearchPopup()),
      );
  }

export default onInputRefBlur;
