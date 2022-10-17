import * as React from 'react';
import { Props } from './index';
import { default as _ } from './main.css';

const base = [
  _["button"],
  _["button--flat"]
].join(' ');

export default function FlatButton(props: Props) {
  const { children, ...rest } = props;

  return (
    <button className={base} {...rest}>
      {children}
    </button>
  );
}
