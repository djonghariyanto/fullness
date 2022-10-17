import * as React from 'react';
import { default as _ } from './main.css';

interface Props {
  children: React.ReactElement[] | React.ReactNode[],
  style?: React.CSSProperties
}

const base = [
  _["wrapper"],
  _["wrapper--inline-spread"]
].join(' ');

const contentChild = _["wrapper--inline-spread__content"];

export function FlexEnd(props: Props) {
  return (
    <span className={contentChild}>
      {props.children}
    </span>
  );
}

export default function InlineSpreadWrapper(props: Props) {
  return (
    <div className={base} {...props}>
      {props.children.map((element: React.ReactElement) =>
        <span key={element.key} className={contentChild}>
          {element}
        </span>
      )}
    </div>
  );
}
