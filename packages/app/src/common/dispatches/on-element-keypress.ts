import { exhaustMap, of, fromEventPattern, filter, Observable, tap } from 'rxjs';

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

const bind = (ref: React.MutableRefObject<Window | Document | Element>): Observable<KeyboardEvent> => {
  const stack = createPattern(ref);

  return fromEventPattern(
    handler => stack.push(handler),
    () => stack.pop()
  );
}

const onElementKeypress = (ref: React.MutableRefObject<Window | Document | Element>, fn: any, defaultedKeys?: string[]) =>
  () => {
    return bind(ref)
      .pipe(
        filter(ev => !ev.defaultPrevented),
        exhaustMap(ev => of(fn(ev.key, ev))
          .pipe(
            filter(action => action !== undefined),
            tap(() => defaultedKeys?.includes((<KeyboardEvent>ev).key)
              ? ev.preventDefault()
              : null
            )
          )
        )
      );
  }

export default onElementKeypress;
