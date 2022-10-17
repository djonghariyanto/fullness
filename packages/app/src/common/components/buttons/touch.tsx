import * as React from 'react';
import { default as _ } from './main.css';
import Style from '@/common/css';

import DefaultButton, { ExposedProps } from './default';

interface TouchButtonProps extends ExposedProps {
  toggled?: boolean,
  forIcon?: boolean
}

const base = [
  _["button--touch"],
  Style["--fg-gb700"],
  Style["--weight-regular"]
].join(' ');

const toggledBase = [base, _["button--touch-toggled"]].join(' ');

export default function TouchButton(props: TouchButtonProps) {
  const { toggled, forIcon, ...rest } = Object.assign({}, { toggled: false, forIcon: false }, props),
    children = React.useMemo(() => forIcon
      ? <div className={_["button--touch__icon"]}>{props.children}</div>
      : <>{props.children}</>
      , []),
    selectBase = toggled ? toggledBase : base;

  return (
    <DefaultButton className={selectBase} {...rest}>
      {children}
    </DefaultButton>
  );
}
