import * as React from 'react';
import { default as _ } from './main.css';

const base = [
  _["wrapper"],
  _["wrapper--icon"],
  _["wrapper--primary-icon"]
].join(' ');

const selectBase = (selected: boolean) => selected
  ? [base, _["wrapper--primary-icon-selected"]].join(' ')
  : base

export default function PrimaryIconWrapper(props: { selected?: boolean, children: React.ReactElement | React.ReactNode, style?: React.CSSProperties }) {
  const { children, selected, ...rest } = Object.assign({}, { selected: false }, props);

  return (
    <div className={selectBase(selected)} {...rest}>
      {children}
    </div>
  );
}

