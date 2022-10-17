import * as React from 'react';
import { default as _ } from './main.css';

const base = [
  _["title"],
  _["title--primary"]
].join(' ');

export default function PrimaryTitle(props: { children: React.ReactNode }) {
  return (
    <div className={base}>
      {props.children}
    </div>
  );
}
