import * as React from 'react';
import { default as _ } from './main.css';

interface Props {
  children: React.ReactNode,
  style?: React.CSSProperties
}

const base = _["message"];
const mark = _["message__mark"];
const value = _["message__value"];

export default function ErrorMessage(props: Props) {
  const { children, style } = props;

  return (
    <div className={base} style={style}>
      <span className={mark}>!</span>
      <span className={value}>{children}</span>
    </div>
  );
}
