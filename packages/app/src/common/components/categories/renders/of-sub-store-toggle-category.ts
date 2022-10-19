import { filter, map } from 'rxjs';
import { Store, ofType } from '@/store';
import { subStore } from '@/store/action';
import { toggleCategory } from '@/common/components/filter-group/store/action';


const ofSubStoreToggleCategory = (index: number) =>
  ({ action }: Store) => {
    return action
      .pipe(
        ofType(subStore),
        filter(({ type, payload }: { type: string, payload: { index: number }}) => type === toggleCategory && payload?.index === index),
        map(() => (render: { selected: boolean }) => ({
          ...render,
          selected: !render.selected
        }))
      );
  }

export default ofSubStoreToggleCategory;
