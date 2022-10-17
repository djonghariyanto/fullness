import * as React from 'react';
import { default as _ } from './main.css';
import Style from '@/common/css';

import DefaultButton, { ExposedProps } from './default';
import PreventDefault from './components/prevent-default';

const base = [
  _["button--default"], 
  _["button--full-width"],
  Style["--inter"],
  Style["--size-txs"],
  Style["--weight-semi-bold"],

].join(' ');

export default function RoundedButton(props: ExposedProps) {
  return (
    <PreventDefault>
      <DefaultButton className={base} {...props}>
        {props.children}
      </DefaultButton>
    </PreventDefault>
  );
}
