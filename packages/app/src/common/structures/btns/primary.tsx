import * as React from 'react';
import { Props, initialProps } from './index';
import { default as _ } from './main.css';

const base = [
  _["button"],
  _["button--primary"]
].join(' ');

const switchClass = (selected: boolean, hidden: boolean, disabled: boolean) =>
  hidden
    ? [base, _["button--primary-hidden"]].join(' ')
    : disabled
      ? [base, _["button--primary-disabled"]].join(' ')
      : selected
        ? [base, _["button--primary-selected"]].join(' ')
        : base


export default function PrimaryButton(props: Props) {
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
