import { fromEventPattern, map, connect, switchMap, EMPTY, merge, filter, Observable } from 'rxjs';

const createPattern = (() => {
  let list = [];

  return (ref: React.MutableRefObject<Window | Document | Element>) => {
    const push = (handler: any) => {
      list?.forEach(({ ref, handler }) => { ref.removeEventListener('keydown', handler) });
      list.unshift({ ref: ref.current, handler });
      list.forEach(({ ref, handler }) => { ref.addEventListener('keydown', handler) });
    }

    const pop = () => {
      const { ref, handler } = list.shift();
      ref.removeEventListener('keydown', handler);
    }

    return { push, pop }
  }
})();

const bind = (ref: React.MutableRefObject<Window | Document| Element>): Observable<KeyboardEvent> => {
  const stack = createPattern(ref);

  return fromEventPattern(
    handler => stack.push(handler),
    () => stack.pop()
  );
}

const onElementKeypress = (ref: React.MutableRefObject<Window | Document | Element>, fn: any, preventFn: (key: string) => boolean = () => false) =>
  () => {
    const preventDefault = (obs: Observable<Event>) => obs
      .pipe(
        filter(e => preventFn((<KeyboardEvent>e).key)),
        map((e: Event) => e.preventDefault()),
        switchMap(() => EMPTY)
      );

    return bind(ref)
      .pipe(
        filter(ev => !ev.defaultPrevented),
        connect(obs => merge(
          preventDefault(obs),
          obs
            .pipe(
              map(e => fn((<KeyboardEvent>e).key, e)),
              filter(action => action !== undefined)
            )
        ))
      );
  }

export default onElementKeypress;
