import * as React from 'react';
import { default as _ } from '@/common/css';

const base = [
  _["--overflow"]
].join(' ');

export default function Wrapper(props: { children: React.ReactElement, style?: React.CSSProperties }) {
  const { children, ...rest } = props;

  return (
    <div className={base} {...rest}>
      {props.children}
    </div>
  );
}
