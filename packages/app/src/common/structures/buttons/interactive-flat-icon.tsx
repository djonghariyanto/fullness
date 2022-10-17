import * as React from 'react';
import { fromEvent, of, merge } from 'rxjs';
import { map, scan, switchMap, filter } from 'rxjs/operators';
import { IconButtonProps } from './';
import { default as _ } from './main.css';
import FlatIconButton from './flat-icon';

export default function InteractiveFlatIconButton(props: IconButtonProps) {
  const { children, selected, disabled, hidden, onClick, ...rest } = Object.assign(
    {}, { disabled: false, selected: false, hidden: false }, props),
    updatedRest = hidden || disabled ? rest : { onClick, ...rest },
    ref = React.useRef<HTMLButtonElement>(null),
    [toggle, setToggle] = React.useState(selected);

  React.useEffect(() => {
    const sub = of(!hidden && !disabled)
      .pipe(
        filter(isInteractive => isInteractive),
        switchMap(() => merge(
          of(selected),
          fromEvent(ref?.current, 'click')
            .pipe(map(() => true)))
        ),
        scan((a, c: boolean) => a !== c, false)
      )
      .subscribe(setToggle);

    return () => sub.unsubscribe();
  }, []);

  return (
    <FlatIconButton
      ref={ref}
      selected={toggle}
      disabled={disabled}
      hidden={hidden}
      {...updatedRest}
    >
      {children}
    </FlatIconButton>
  );
}
