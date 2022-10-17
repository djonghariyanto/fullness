import * as React from 'react';
import { fromEvent, iif, EMPTY } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { useStore, Store } from '@/store';

export default function PreventDefault(props: { children: React.ReactElement }) {
  const { usePipeline } = useStore(),
    ref = React.useRef(null);

  usePipeline(
    ({ state }: Store) => state
      .pipe(
        switchMap(state => iif(
          () => state.status.hasErrorOccured,
          fromEvent(ref?.current, 'pointerdown')
            .pipe(
              tap((e: React.SyntheticEvent) => e.preventDefault()),
              tap((e: React.SyntheticEvent) => e.stopPropagation()),
            ),
          EMPTY
        ))
      )
  );

  return { 
    ...props.children,
    props: {
      ref,
      ...props.children.props
    }
  };
}
