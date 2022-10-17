import * as React from 'react';
import { default as _ } from './main.css';
import Style from '@/common/css';

import DefaultButton, { ExposedProps } from './default';
import Inward from '@/common/svgs/inward';
import Outward from '@/common/svgs/outward';

interface PointedButtonProps extends ExposedProps {
  direction?: "left" | "right"
}

const base = [
  _["button--pointed"],
  Style["--inter"],
  Style["--size-tsm"],
  Style["--fg-gb800"],
  Style["--bg-gb50"],
  Style["--weight-regular"]
].join(' ');

const getDirection = (direction: "left" | "right") =>
  direction === 'left'
    ? [
      <Inward className={Style["--fg-white"]} style={{ transform: 'rotate(180deg)' }} />,
      <Outward className={Style["--fg-white"]} style={{ transform: 'rotate(180deg)' }} />
    ]
    : [ 
      <Outward className={Style["--fg-white"]} />,
      <Inward className={Style["--fg-white"]}  />
    ]

export default function PointedButton(props: PointedButtonProps) {
  const { direction, ...rest } = Object.assign({}, { direction: 'right' }, props),
    [ Left, Right ] = getDirection(direction);

  return (
    <DefaultButton className={base} {...rest}>
      {Left}
      {props.children}
      {Right}
    </DefaultButton>
  );
}
