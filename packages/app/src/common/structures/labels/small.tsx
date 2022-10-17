import * as React from 'react';
import { default as _ } from './main.css';

const base = [
  _["label"],
  _["label--small"]
].join(' ');

export default function SmallLabel(props: { children: React.ReactNode }) {
  return (
    <div className={base}>
      {props.children}
    </div>
  );
}
