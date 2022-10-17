import { MutableRefObject } from 'react';
import preventDefaultOnEvent from './prevent-default-onevent';

const preventDefaultOnSubmit = (ref: MutableRefObject<HTMLElement>) =>
  preventDefaultOnEvent(ref, 'submit');

export default preventDefaultOnSubmit;
