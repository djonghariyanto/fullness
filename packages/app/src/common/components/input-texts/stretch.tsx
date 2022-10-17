import * as React from 'react';
import { default as _ } from './main.css';

import InputText from '.';
import { Props } from '.';

const base = [_["input__value"], _["input__value--full-width"]].join(' ');

export default function DefaultInputText(props: Omit<Props, "className">) {
  return <InputText className={ base } {...props}/>
}
