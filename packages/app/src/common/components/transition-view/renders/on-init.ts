import { of, fromEvent, map, debounceTime, defer, distinctUntilChanged, switchMap, merge } from 'rxjs';
import { base } from '../';

const onInit = (ref: React.MutableRefObject<HTMLElement>, length: number, observe: boolean) =>
  () => {
    const init$ = defer(() => of(ref.current.parentElement.getBoundingClientRect()))
      .pipe(
        map(({ width }) => width),
        map(x => (render: any) => {
          return {
          ...render,
          className: base,
          style: {
            width: `calc(${length + 2} * ${x}px)`,
            transform: `translateX(-${x * render.index}px)`
          }
        }})
      ),
      resize$ = fromEvent(window, 'resize')
        .pipe(
          debounceTime(200),
          map(() => window.innerWidth > 800 ? 'default' : 'mobile'),
          distinctUntilChanged(),
          switchMap(() => init$)
        );

    return observe ? merge(init$, resize$) : init$;
  }

export default onInit;
