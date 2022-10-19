import { first, map } from 'rxjs';
import { Store } from '@/store';
import { categoryList } from '../';

const onInit = () =>
  ({ state }: Store) => {
    return state
      .pipe(
        map(state => state.filters[state.status.editFilterIndex]?.categories),
        map(categories => categories ? categories.map(category => category.id) : []),
        map(categories => categoryList.map(category => ({ id: category, selected: categories.includes(category) }))),
        map(categories => (render: { categories: any }) => ({
          ...render, categories
        })),
        first()
      );
  }

export default onInit;
