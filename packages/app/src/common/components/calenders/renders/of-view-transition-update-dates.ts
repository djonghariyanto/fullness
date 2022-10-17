import { merge, asyncScheduler, of } from 'rxjs';
import { withLatestFrom, map, observeOn, filter, scan } from 'rxjs/operators';

import { previousMonthId, nextMonthId } from '../';
import { Store, ofType } from '@/store';
import { FilterItem } from '@/store/state';
import { previousInTransitionView, nextInTransitionView } from '@/store/action';
import generateDateByMonth from '../common/utility.generate-date-by-month';

const ofViewTransitionUpdateDates = () =>
  ({ state, action }: Store) => {
    const next$ = action
      .pipe(
        ofType(nextInTransitionView),
        filter(({ id }) => id.includes(nextMonthId)),
        map(() => 1)
      ),
      previous$ = action
        .pipe(
          ofType(previousInTransitionView),
          filter(({ id }) => id.includes(previousMonthId)),
          map(() => -1)
        ),
      init$ = of(0).pipe(observeOn(asyncScheduler)),
      date$ = state
        .pipe(
          map(state => <FilterItem[]>state.dialog?.result?.dates),
          map(dates => dates?.map(date => date.id))
        );

    return merge(init$, previous$, next$)
      .pipe(
        withLatestFrom(date$),
        scan((calender, [operand, existingDates]) =>
          generateDateByMonth(calender.current, { operand, existingDates }),
          { current: new Date }
        ),
        map(calender => (render: any) => ({
          ...render,
          calender
        }))
      );
  }

export default ofViewTransitionUpdateDates;
