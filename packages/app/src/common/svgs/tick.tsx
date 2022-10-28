import * as React from 'react';
import { default as _ } from './main.css';

const base = _['selected'];

export default function Tick(props: any) {
  return (
    <svg className={base} viewBox="0 0 24 24" {...props}>
      <path d="M3.41421 10.6152L9.69237 16.8934L8.98526 17.6005L2 10.6152H3.41421Z" />
      <path d="M20.5858 6L22 6L10.3995 17.6005C10.009 17.991 9.37579 17.991 8.98526 17.6005L20.5858 6Z" />
    </svg>
  );
}

