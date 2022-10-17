import * as React from 'react';
import { default as _ } from './main.css';
import Style from '@/common/css';

import DefaultButton, { ExposedProps } from './default';

interface IconButtonProps extends ExposedProps {
  toggled?: boolean,
  selected?: boolean
}

const base = [
  _["button--opaque-icon"],
  Style["--inter"],
  Style["--size-tsm"]
].join(' ');

const selectedBase = [ base, _["button--opaque-icon-selected"] ].join(' ');

export default function OpaqueIconButton(props: IconButtonProps)  {
  const { toggled, selected, ...rest } = Object.assign({}, { toggled: false, selected: false }, props),
    selectBase = selected ? selectedBase : base;

  return (
    <DefaultButton className={selectBase} {...rest}>
      {props.children}
    </DefaultButton>
  );
}
