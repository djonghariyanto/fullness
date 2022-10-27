import { map, filter, distinctUntilKeyChanged } from 'rxjs';
import { Store } from '@/store';

const fromStoreSelectItem = (id: number) =>
  ({ state }: Store) => {
    return state
      .pipe(
        map(state => state.searchPopup),
        distinctUntilKeyChanged('index'),
        map(search => search.index),
        filter(index => (index.curr === id || index.prev === id)),
        map(index => (render: { selected: boolean }) => ({
          ...render,
          selected: index.curr === id
        }))
      );
  }

export default fromStoreSelectItem;
