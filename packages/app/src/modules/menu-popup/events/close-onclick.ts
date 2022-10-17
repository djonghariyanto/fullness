import { fromEvent, race, merge } from 'rxjs';
import { map, first, take, concatMap, skip, tap } from 'rxjs/operators';

import { closeMenuPopup } from '@/store/action';

const closeOnclick = () =>
  () => {
    const capture = fromEvent(document, 'click', { capture: true }),
      bubble = fromEvent(document, 'click', { capture: false });

    return merge(capture)
      .pipe(
        concatMap(() => bubble),
        map(() => closeMenuPopup()),
      );
  }

const acloseOnclick = () =>
  () => {
    return race(fromEvent(document, 'click'), fromEvent(document, 'pointerdown'))
      .pipe(
        skip(1),
        map(() => closeMenuPopup()),
        first()
      );
  }

export default closeOnclick;
