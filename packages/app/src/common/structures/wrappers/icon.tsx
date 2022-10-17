import * as React from 'react';
import { default as _ } from './main.css';

const base = [
  _["wrapper"],
  _["wrapper--icon"]
].join(' ');

const child = _["wrapper__icon"];

const selectBase = (selected: boolean) => selected
  ? [base, _["wrapper--icon-selected"]].join(' ')
  : base

export function Icon(props: { style?: React.CSSProperties, children: React.ReactElement }) {
  const { children, ...rest } = props;

  return (
    <div className={child} { ...rest}>
      {children}
    </div>
  );
}

export default function IconWrapper(props: { selected?: boolean, children: React.ReactElement, style?: React.CSSProperties }) {
  const { children, selected, ...rest } = Object.assign({}, { selected: false }, props);

  return (
    <div className={selectBase(selected)} {...rest}>
      {children}
    </div>
  );
}

