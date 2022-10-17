import * as React from 'react';
import { default as _ } from './main.css';

const base = [
  _["label"],
  _["label--primary"]
].join(' ');

export default function PrimaryLabel(props: { children: React.ReactNode }) {
  return (
    <div className={base}>
      {props.children}
    </div>
  );
}
