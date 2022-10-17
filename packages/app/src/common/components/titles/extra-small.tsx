import * as React from 'react';
import Style from '@/common/css';

import getWeightClass  from './common/get-weight-class';

import DefaultTitle, { TitleProps } from './default';

const base = Style["--size-xs"];

export default function ExtraSmallTitle(props: TitleProps) {
  const weightedBase = [base, getWeightClass(props.weight)].join(' ');

  return (
    <DefaultTitle className={weightedBase} {...props}>
      {props.children}
    </DefaultTitle>
  );
}
