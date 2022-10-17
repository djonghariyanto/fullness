import { of } from 'rxjs';
import { skip, filter, switchMap, map } from 'rxjs/operators';
import { base } from '../';
import createIntersection from '../common/observable.create-intersection';

const onIntersectDoResetPosition = (ref: React.MutableRefObject<HTMLElement>, index: number) =>
  () => {
    return createIntersection(ref.current)
      .pipe(
        skip(1),
        filter(([intersection]) => intersection.isIntersecting),
        switchMap(() => of(ref.current.getBoundingClientRect())),
        map(({ width }) => width * index),
        map(x => (render: any) => ({
          ...render,
          className: base,
          style: {
            ...render.style,
            transform: `translateX(-${x}px)`
          }
        }))
      );
  }

export default onIntersectDoResetPosition;
