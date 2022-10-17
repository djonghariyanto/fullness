import * as React from 'react';
import { iconBase, iconChild, IconButtonProps } from './';
import Style from '@/common/css';

const base = [
  iconBase,
  Style["--bg-s400"],
  Style["--fg-gb900"]
].join(' ');

export default function PrimaryIconButton(props: IconButtonProps) {
  const { children, ...rest } = props;

  return (
    <button className={base} {...rest}>
      <div className={iconChild}>
        {children}
      </div>
    </button>
  );
}

