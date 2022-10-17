import { filter, map, skip } from 'rxjs/operators';
import { setTransitionViewIndex } from '@/store/action';

import createIntersection from '../common/observable.create-intersection';

const onIntersectDispatchSetTransitionViewIndex = (ref: React.MutableRefObject<HTMLElement>, currentId: string, index: number) =>
  () => {
    return createIntersection(ref.current)
      .pipe(
        skip(1),
        filter(([intersection]) => intersection.isIntersecting),
        map(() => ({ id: currentId, index })),
        map(setTransitionViewIndex),
      );
  }

export default onIntersectDispatchSetTransitionViewIndex; 
