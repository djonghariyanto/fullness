import * as React from 'react';
import { default as _ } from './main.css';

interface Props {
  children: React.ReactNode[] | React.ReactElement[]
}

const base = [
  _["list"],
  _["list--row"]
].join(' ');

export default function RowList(props: Props) {
  return (
    <div className={base}>
      {props.children}
    </div>
  );
}
