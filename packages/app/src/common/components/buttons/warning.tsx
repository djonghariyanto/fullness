import * as React from 'react';
import { default as _ } from './main.css';
import Style from '@/common/css';

import DefaultButton, { ExposedProps } from './default';
import PreventDefault from './components/prevent-default';

const base = [
  _["button--warning"],
  Style["--inter"],
  Style["--size-lg"],
  Style["--weight-regular"]
].join(' ');

export default function WarningButton(props: ExposedProps) {
  return (
    <PreventDefault>
      <DefaultButton className={base} {...props}>
        {props.children}
      </DefaultButton>
    </PreventDefault>
  );
}
