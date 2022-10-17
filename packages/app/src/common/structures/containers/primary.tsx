import * as React from 'react';
import { default as _ } from './main.css'

const base = [
  _["container"],
  _["container--primary"]
].join(' ');

export default function PrimaryContainer(props: { children: React.ReactElement }) {
  const { children } = props;

  return (
    <div className={base}>
      {children}
    </div>
  );
}

