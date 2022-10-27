import { subStore } from '@/store/action';
import { commitValue } from '../search';

const keyReducer = (key: string) => {
  switch(key) {
    case 'Enter':
      return subStore({ type: commitValue });
  }
}

export default keyReducer;
