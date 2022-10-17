import * as React from 'react';
import { default as _ } from './main.css';

interface Props {
  children: React.ReactElement | React.ReactElement[],
  style?: React.CSSProperties,
  id?: string
}

const base = [
  _["wrapper"],
  _["wrapper--touch"]
].join(' ');

export default function TouchWrapper(props: Props) {
  return (
    <div className={base} {...props}>
      {props.children}
    </div>
  );
}
