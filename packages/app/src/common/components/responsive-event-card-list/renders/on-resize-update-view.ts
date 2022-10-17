import { map, Observable, combineLatestWith, distinctUntilKeyChanged, distinctUntilChanged } from 'rxjs';
import { Store } from '@/store';

const onResizeUpdateView: <T>(ref: React.MutableRefObject<HTMLElement>, fn: ([count, events]: [number, any]) => Partial<T>) => (state: Store) => Observable<(render: T) => T> = (ref, fn) =>
  ({ state }: Store) => {
    const obs$ = new Observable(subscriber => {
      const resize = new ResizeObserver((entries) => {
        const element = entries[0].contentRect;
        subscriber.next(element);
      });

      resize.observe(ref.current);
    })
      .pipe(
        map((rect: DOMRectReadOnly) => Math.ceil(rect.width / 600)),
        distinctUntilChanged(),
      ),
      event$ = state
        .pipe(
          distinctUntilKeyChanged('events'),
          map(state => state.events)
        );

    return obs$
      .pipe(
        combineLatestWith(event$),
        map(([count, events]: [number, any]) => (render) => ({
          ...render,
          ...fn([count, events])
        }))
      );
  }

export default onResizeUpdateView;
