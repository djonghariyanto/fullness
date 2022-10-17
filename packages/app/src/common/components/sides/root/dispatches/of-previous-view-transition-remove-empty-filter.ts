import { filter, map } from 'rxjs/operators';

import { Store, ofType } from '@/store';

import { previousInTransitionView, removeEmptyFilter } from '@/store/action';
import { rootSideMenuId } from '@/common/components/sides/root';

const ofPreviousViewTransitionRemoveEmptyFilter = () =>
  ({ action }: Store) => {
    return action
      .pipe(
        ofType(previousInTransitionView),
        filter(({ id }) => id === rootSideMenuId),
        map(() => removeEmptyFilter())
      );
  }

export default ofPreviousViewTransitionRemoveEmptyFilter;
