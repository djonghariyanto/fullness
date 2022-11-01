import * as React from 'react';
import { default as _ } from './main.css';

interface Props {
  children: React.ReactElement | React.ReactElement[] | React.ReactNode
}

const base = [
  _["wrapper"],
  _["wrapper--primary"]
].join(' ');

export default function PrimaryWrapper(props: Props) {
  return (
    <div className={base}>
      {props.children}
    </div>
  );
}
