import { map, withLatestFrom, of } from 'rxjs';
import { calculatePosition } from '../';
import { Store } from '@/store';

const onInitCalculatePosition = (ref: React.MutableRefObject<HTMLElement>) =>
  ({ state }: Store) => {
    const callerPosition$ = state
      .pipe(
        map(state => state.searchPopup.byRef),
        map(ref => ref.getBoundingClientRect())
      );

    return of(ref.current.getBoundingClientRect())
      .pipe(
        withLatestFrom(callerPosition$),
        map(calculatePosition),
        map(style => (render: { style: React.CSSProperties, className: string }) => ({
          ...render,
          style: { ...style, opacity: 1 }
        }))
      );
  }

export default onInitCalculatePosition;
