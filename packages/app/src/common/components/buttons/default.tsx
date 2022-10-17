import * as React from 'react';
import { default as _ } from './main.css';

interface Props {
  className: string,
  ref?: React.Ref<HTMLInputElement>,
  disabled?: boolean,
  children: React.ReactNode | React.ReactNode[],
  onClick?: React.ReactEventHandler,
  onClickCapture?: React.ReactEventHandler,
  style?: React.CSSProperties,
  id?: string
}

export type ExposedProps = Omit<Props, "className">;

const base = _["button"];

export default function DefaultButton(props: Props) {
  const { className, ...rest } = props,
    baseClass = `${base} ${className}`;

  return (
    <button className={baseClass} {...rest}>
      {props.children}
    </button>
  );
}
