import * as React from 'react';
import { iconBase, iconChild, IconButtonProps } from './';
import { default as _ } from './main.css';

const base = [iconBase, _["btn--secondary"]].join(' ');

export default function SecondaryIconButton(props: IconButtonProps) {
  const { children, isText, ...rest } = Object.assign({}, { isText: false }, props);

  return (
    <button className={base} {...rest}>
      <div className={iconChild}>
        {children}
      </div>
    </button>
  );
}
