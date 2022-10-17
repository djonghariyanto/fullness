import * as React from 'react';
import { default as _ } from './main.css';

const base = _["selected"];

export default function OnOff(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="inherit" {...props}>
      <circle className={base} cx="10" cy="12" r="7.5"/>
      <rect x="17" y="11" width="5" height="2" rx="1"/>
    </svg>
  );
}
