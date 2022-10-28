import * as React from 'react';
import onElementKeypress from './on-element-keypress';

const onKeypress = (fn: any, defaultedKeys?: string[]) => {
  const ref = React.useRef(window);

  return onElementKeypress(ref, fn, defaultedKeys);
}

export default onKeypress;
