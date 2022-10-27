import * as React from 'react';
import onElementKeypress from './on-element-keypress';

const onKeypress = (fn: any, preventFn: (key: string) => boolean = () => false) => {
  const ref = React.useRef(window);

  return onElementKeypress(ref, fn, preventFn);
}

export default onKeypress;
