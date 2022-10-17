import * as React from 'react';
import { default as _ } from './main.css';
import selectClass from './common/util.select-class';

interface Props {
  children: React.ReactElement | React.ReactElement[],
  style?: React.CSSProperties,
  selector?: "apart" 
}

const base = [
  _["inline"]
].join(' ');

const defaultChild = [
  _["inline__item"]
].join(' ');

export function InlineItem(props: { children: React.ReactElement | React.ReactElement[] }) {
  return (
    <div className={defaultChild}>
      {props.children}
    </div>
  );
}

export default function Inline(props: Props) {
  const { children, selector, ...rest } = Object.assign({}, props),
    updatedBase = [base, selectClass(selector)].join(' ');
    
  return (
    <div className={updatedBase} {...rest}>
      {children}
    </div>
  );
}

