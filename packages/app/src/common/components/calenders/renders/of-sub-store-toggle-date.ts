import { filter, map } from 'rxjs';
import { Store, ofType } from '@/store';
import { subStore } from '@/store/action';
import { toggleDate } from '@/common/components/filter-group/store/action';


const ofSubStoreToggleDate = (index: number) =>
  ({ action }: Store) => {
    return action
      .pipe(
        ofType(subStore),
        filter(({ type, payload }: { type: string, payload: { index: number }}) => type === toggleDate && payload?.index === index),
        map(() => (render: { selected: boolean }) => ({
          ...render,
          selected: !render.selected
        }))
      );
  }

export default ofSubStoreToggleDate;
