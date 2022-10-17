import { FilterStore } from './';
import { FilterItem } from '@/store/state';
import { saveDate, toggleDate, saveCategory, toggleCategory } from './action';

const reducer = (store: FilterStore, action: { type: string, payload?: FilterItem }) => {
  switch (action.type) {
    case toggleDate:
      return {
        ...store,
        dates: store.dates.find(date => date.id === (<FilterItem>action.payload).id)
          ? store.dates.filter(date => date.id !== (<FilterItem>action.payload).id)
          : [...store.dates, action.payload]
      }
    case saveDate:
      return {
        ...store,
        dates: [...store.dates, action.payload]
      }
    case saveCategory:
      return {
        ...store,
        categories: [...store.categories, action.payload]
      }
    case toggleCategory:
      return {
        ...store,
        categories: store.categories.find(category => category.id === action.payload.id)
          ? store.categories.filter(category => category.id !== action.payload.id)
          : [...store.categories, action.payload]
      }
    default: return store;
  }
}

export default reducer;
