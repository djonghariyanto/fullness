import * as React from 'react';
import Style from '@/common/css';

const base = [
  Style["--inter"],
  Style["--fg-gb500"],
  Style["--size-tsm"]
].join(' ');

export default function NavigationItemLabel(props: { children: React.ReactNode }) {
  return (
    <span className={base}>
      {props.children}
    </span>
  );
}
