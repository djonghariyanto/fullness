import * as React from 'react';
import { default as _ } from '../main.css';

const child = _["wrapper__icon"];

export default function Icon(props: { style?: React.CSSProperties, children: React.ReactElement }) {
  const { children, ...rest } = props;

  return (
    <div className={child} { ...rest}>
      {children}
    </div>
  );
}

