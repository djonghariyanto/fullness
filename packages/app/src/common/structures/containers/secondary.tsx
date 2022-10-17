import * as React from 'react';
import { default as _ } from './main.css'

const base = [
  _["container"],
  _["container--secondary"]
].join(' ');

export default function SecondaryContainer(props: { children: React.ReactElement }) {
  const { children } = props;

  return (
    <div className={base}>
      {children}
    </div>
  );
}

