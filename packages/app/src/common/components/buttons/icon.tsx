import * as React from 'react';
import { default as _ } from './main.css';
import Style from '@/common/css';

import DefaultButton, { ExposedProps } from './default';

interface IconButtonProps extends ExposedProps {
  toggled?: boolean
}

const base = [
  _["button--icon"],
  Style["--fg-gb25"],
  Style["--size-xl"],
  Style["--weight-regular"]
].join(' ');

const toggledBase = [ base, _["button--icon-toggled"] ].join(' ');

export default function IconButton(props: IconButtonProps)  {
  const { toggled, ...rest } = Object.assign({}, { toggled: false }, props),
    selectBase = toggled ? toggledBase : base;

  return (
    <DefaultButton className={selectBase} {...rest}>
      {props.children}
    </DefaultButton>
  );
}
