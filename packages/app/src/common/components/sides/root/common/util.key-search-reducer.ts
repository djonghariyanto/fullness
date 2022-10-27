import { subStore } from '@/store/action';
import { escapeInput, openPopup } from '../store';

const keySearchReducer = (key: string, e: KeyboardEvent) => {
  switch(key) {
    case 'Escape':
      return subStore({ type: escapeInput, payload: e });
    case 'ArrowDown':
      return subStore({ type: openPopup });
  }
}

export default keySearchReducer;
