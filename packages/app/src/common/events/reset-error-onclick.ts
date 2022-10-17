import { fromEvent, merge } from 'rxjs';
import { map, first, switchMap, filter } from 'rxjs/operators';
import { Store } from '@/store';
import { resetStatusError } from '@/store/action';

const resetErrorOnClick = () =>
  ({ state }: Store) => {
    const mouseDown$ = fromEvent(document, 'mousedown'),
      pointerDown$ = fromEvent(document, 'pointerdown'),
      click$ = merge(mouseDown$, pointerDown$)
        .pipe(
          first()
        );

      return state
        .pipe(
          filter(state => state.status.hasErrorOccured),
          switchMap(() => click$),
          map(() => resetStatusError())
        );
  }

  export default resetErrorOnClick;
