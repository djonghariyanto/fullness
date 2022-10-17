import * as React from 'react';
import { default as _ } from './main.css'

const base = [
  _["wrapper"],
  _["wrapper--title"]
].join(' ');

export default function TitleWrapper(props: { children: React.ReactNode }) {
  return (
    <div className={base}>
      {props.children}
    </div>
  );
}
