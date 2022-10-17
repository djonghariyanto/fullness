import * as React from 'react';
import Style from '@/common/css';
import { Weight } from './common/get-weight-class';

interface Props {
  className: string,
  children: React.ReactNode | React.ReactNode[],
  style?: React.CSSProperties
}

export interface TitleProps extends Omit<Props, "className"> { weight: Weight }

const base = [
  Style["--inter"]
].join(' ');

export default function Default(props: Props) {
  const { className, ...rest } = props,
    baseClass = `${base} ${className}`;

  return (
    <span className={baseClass} {...rest}>
      {props.children}
    </span>
  );
}

