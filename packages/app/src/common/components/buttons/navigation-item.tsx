import * as React from 'react';
import { default as _ } from './main.css';
import Style from '@/common/css';

import DefaultButton, { ExposedProps } from './default';

const base = [
  _["button--flex"],
  _["button--navigation-item"],
  _["button--full-width"],
  Style["--inter"],
  Style["--fg-gb700"],
  Style["--size-tsm"],
  Style["--weight-medium"],
].join(' ');

const titleBase = [
  _["button--navigation-item__title"],
  Style["--inter"],
  Style["--fg-gb500"],
  Style["--size-tsm"]
].join(' ');

const textBase = _["button--navigation-item__text"];

export function NavigationItemTitle(props: { children: React.ReactNode }) {
  return (
    <span className={titleBase}>
      {props.children}
    </span>
  );
}

export function NavigationItemText(props: { children: React.ReactNode }) {
  return (
    <span className={textBase}>
      {props.children}
    </span>
  );
}

export default function NavigationItemButton(props: ExposedProps) {
  return (
    <DefaultButton className={base} {...props}>
      {props.children}
    </DefaultButton>
  );
}
