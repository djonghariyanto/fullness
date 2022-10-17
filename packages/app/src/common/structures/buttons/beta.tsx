import * as React from 'react';
import { default as _ } from './main.css';
import Style from '@/common/css';

interface Props {
  children: React.ReactElement,
  onClick?: React.ReactEventHandler;
  style?: React.CSSProperties
}

const base = [
  _["button"],
  Style["--bg-gb50"]
].join(' ');

export default function BetaButton(props: Props) {
  const { children, ...rest } = props;

  return (
    <button className={base} {...rest}>
      {children}
    </button>
  );
}
