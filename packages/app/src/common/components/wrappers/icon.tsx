import * as React from 'react';
import { default as _ } from './main.css';

interface Props {
  children: React.ReactElement,
  style?: React.CSSProperties
}

const base = [
  _["wrapper"],
  _["wrapper--icon"]
].join(' ');

const childrenBase = _["wrapper--icon__children"];

export default function IconWrapper(props: Props) {
  return (
    <div className={base} {...props}>
      <div className={childrenBase}>
        {props.children}
      </div>
    </div>
  );
}
