import * as React from 'react';
import { default as _ } from './main.css';

import InputText from '.';
import { Props } from '.';

export default function DefaultInputText(props: Omit<Props, "className">) {
  const def: Props = {
    ...props,
    className: _["input__value"]
  }

  return <InputText {...def}/>
}
