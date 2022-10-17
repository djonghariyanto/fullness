import { merge, of, defer } from 'rxjs';
import { map, tap, scan, withLatestFrom, filter, switchMap, startWith } from 'rxjs/operators';
import { base, animateBase } from '../';

import { Store, ofType } from '@/store';
import { nextInTransitionView, previousInTransitionView, setTransitionViewIndex } from '@/store/action';
import checkEqual from '../common/util.check-equal';

const ofViewTransitionChangeStyle = (ref: React.MutableRefObject<HTMLElement>, currentId: string) =>
  ({ action }: Store) => {
    const count = ref.current.childElementCount,
      width$ = of(ref.current.parentElement.getBoundingClientRect())
        .pipe(
          map(({ width }) => width)
        ),
      previous$ = action
        .pipe(
          ofType(previousInTransitionView),
          filter(({ id }) => checkEqual(id, currentId)),
          map(() => -1)
        ),
      next$ = action
        .pipe(
          ofType(nextInTransitionView),
          filter(({ id }) => checkEqual(id, currentId)),
          map(() => 1)
        );

    return action
      .pipe(
        ofType(setTransitionViewIndex),
        filter(({ id }) => checkEqual(id, currentId)),
        map(({ index }) => index),
        startWith(1),
        switchMap(index => merge(previous$, next$)
          .pipe(
            startWith(0),
            scan((a, c) => ({
              reset: c === 0,
              width: ref.current.parentElement.getBoundingClientRect().width,
              index: (a.index + c) % (count),
            }), { index, reset: false }),
          )
        ),
        map(state => [state, ref.current.parentElement.getBoundingClientRect().width]),
        map(([state, width]: [{ index: number, reset: boolean }, number]) => (render: any) => ({
          ...render,
          className: state.reset ? base : animateBase,
          index: state.index,
          style: {
            ...render.style,
            transform: `translateX(-${state.index * width}px)`
          }
        }))
      );
  }

export default ofViewTransitionChangeStyle;
