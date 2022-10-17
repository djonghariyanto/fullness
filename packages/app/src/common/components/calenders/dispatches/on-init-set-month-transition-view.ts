import { merge, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { previousMonthId, currentMonthId, nextMonthId } from '../';
import { setTransitionViewIndex } from '@/store/action';

const onInitSetMonthTransitionView = () =>
  () => {
    const month = (new Date).getMonth(),
      previous$ = of({ id: previousMonthId, index: month }),
      current$ = of({ id: currentMonthId, index: month + 1 }),
      next$ = of({ id: nextMonthId, index: month + 2 });

    return merge(previous$, current$, next$)
      .pipe(
        map(setTransitionViewIndex),
      );
  }

export default onInitSetMonthTransitionView;
