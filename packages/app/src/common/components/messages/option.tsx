import * as React from 'react';
import { default as _ } from './main.css';

const base = _["message"];
const box = [base, _["message--box-default"], _["message--center"]].join(' ');

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

export default function OptionMessage(props: Props) {

  return (
    <div className={box}>
      {props.children}
    </div>
  );
}
