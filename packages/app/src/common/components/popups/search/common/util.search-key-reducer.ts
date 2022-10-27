import { subStore, closeSearchPopup } from '@/store/action';
import { prevSearchResultIndex, nextSearchResultIndex } from '../store';

const searchKeyReducer = (key: string) => {
  switch(key) {
    case 'ArrowUp':
      return subStore({ type: prevSearchResultIndex });
    case 'ArrowDown':
      return subStore({ type: nextSearchResultIndex });
    case 'Escape':
      return closeSearchPopup();
  }
}

export default searchKeyReducer;
