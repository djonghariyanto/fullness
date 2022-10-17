import { asyncScheduler } from 'rxjs';
import { map, observeOn } from 'rxjs/operators';
import { Store, ofType } from '@/store';
import { activateDialog, setTransitionViewIndex } from '@/store/action';
import { filterTitleId, filterGroupId } from '@/common/components/filter-group';

const ofActivateDialogSetTransitionViewIndex = () =>
  ({ action }: Store) => {
    return action
      .pipe(
        observeOn(asyncScheduler),
        ofType(activateDialog),
        map(({ payload }) => ({
          id: [filterTitleId, filterGroupId],
          index: <number>payload
        })),
        map(setTransitionViewIndex)
      );
  }

export default ofActivateDialogSetTransitionViewIndex;
