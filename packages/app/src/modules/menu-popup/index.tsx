import * as React from 'react';
import { default as _ } from './main.css';

import { Store, useStore } from '@/store';
import loadPopup from './renders/load-popup';
import closeOnClick from './events/close-onclick';
import { of, fromEvent } from 'rxjs';
import { tap, map, withLatestFrom, debounceTime, switchMap, first } from 'rxjs/operators';

const base = _["menu-popup"];

export interface Render {
  Content: React.ReactElement
}

const calculatePosition = ([menu, anchor]) => {
  const isOverflowed = anchor.left + menu.width < window.innerWidth,
    left = isOverflowed
      ? ((anchor.width / 2) + anchor.left) - (menu.width / 2)
      : anchor.left - (menu.width - anchor.width),
    top = anchor.top + anchor.height + 16;

  return { top, left }
}

export function MenuPopupWrapper(props: { children: React.ReactElement }) {
  const { children } = props,
    ref = React.useRef(null),

    { useDispatchPipeline, usePipeline, useRenderPipeline } = useStore(),

    render = useRenderPipeline(
      [
        ({ state }: Store) => {
          const callerPosition$ = state
            .pipe(
              map(state => state.menuPopup.byRef),
              map(ref => ref.getBoundingClientRect())
            );

          return of(ref.current.getBoundingClientRect())
            .pipe(
              withLatestFrom(callerPosition$),
              map(calculatePosition),
              map(style => (render: { style: React.CSSProperties }) => ({
                ...render,
                style: { ...style, opacity: 1 }
              }))
            );
        },
        ({ state }: Store) => {
          return fromEvent(window, 'resize')
            .pipe(
              debounceTime(200),
              switchMap(() => state.pipe(first())),
              map(state => state.menuPopup.byRef.getBoundingClientRect()),
              map(anchor => [ref.current.getBoundingClientRect(), anchor]),
              map(calculatePosition),
              map(style => (render: { style: React.CSSProperties }) => ({
                ...render,
                style: { ...style, opacity: 1 }
              }))
            );
        }
      ],
      { style: null }
    );

  usePipeline(
    () => fromEvent<MouseEvent>(ref.current, 'click')
      .pipe(
        tap(e => e.preventDefault()),
        tap(e => e.stopPropagation())
      )
  );
  
  useDispatchPipeline(
    [
      closeOnClick(),
    ]
  );

  return (
    <div ref={ref} className={base} style={render.style}>
      {children}
    </div >
  );
}

export default function MenuPopup() {
  const { useRenderPipeline } = useStore(),
    render = useRenderPipeline(loadPopup(), { Content: null });

  return render.Content;
}
