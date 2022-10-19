import * as React from 'react';
import { Props, initialProps } from './index';
import { default as _ } from './main.css';

const base = [
  _["button"],
  _["button--flat"]
].join(' ');

const switchClass = (selected: boolean, hidden: boolean, disabled: boolean) =>
  hidden
    ? [base, _["button--flat-hidden"]].join(' ')
    : disabled
      ? [base, _["button--flat-disabled"]].join(' ')
      : selected
        ? [base, _["button--flat-selected"]].join(' ')
        : base


export default function FlatButton(props: Props) {
  const { children, selected, hidden, disabled, ...rest } = Object.assign({}, initialProps, props);

  return (
    <button
      className={switchClass(selected, hidden, disabled)}
      {...rest}
    >
      {children}
    </button>
  );
}
