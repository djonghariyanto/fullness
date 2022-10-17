import * as React from 'react';
import { default as _ } from './main.css';
import Style from '@/common/css';

import DefaultButton, { ExposedProps } from './default';

const base = [
  _["button--filled"],
  Style["--inter"],
  Style["--size-tsm"],
  Style["--fg-gb800"],
  Style["--weight-regular"]
].join(' ');

export default function FilledButton(props: ExposedProps) {
  return (
    <DefaultButton className={base} {...props}>
      {props.children}
    </DefaultButton>
  );
}
