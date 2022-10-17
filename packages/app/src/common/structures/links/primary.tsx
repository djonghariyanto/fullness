import * as React from 'react';
import { default as _ } from './main.css';

const base = [
  _["link"],
  _["link--primary"]
].join(' ');

interface Props {
  href?: string,
  onClick?: React.ReactEventHandler,
  children: React.ReactNode
}


export default function PrimaryLink(props: Props) {
  return (
    <a className={base} {...props}>
      {props.children}
    </a>
  );
}
