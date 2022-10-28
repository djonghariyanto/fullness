import * as React from 'react';
import { Props, initialProps } from './index';
import { default as _ } from './main.css';

const base = [
  _["button"],
  _["button--secondary"]
].join(' ');

const switchClass = (selected: boolean, hidden: boolean, disabled: boolean) =>
  hidden
    ? [base, _["button--secondary-hidden"]].join(' ')
    : disabled
      ? [base, _["button--secondary-disabled"]].join(' ')
      : selected
        ? [base, _["button--secondary-selected"]].join(' ')
        : base


export default function SecondaryButton(props: Props) {
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
