import { asapScheduler } from 'rxjs';
import { map, filter, observeOn, withLatestFrom, first } from 'rxjs/operators';

import { Store, ofType } from '@/store';
import { closeDialog, setFilter } from '@/store/action';

const ofCloseDialogConfirmFilters = () =>
  ({ state, action }: Store) => {
    const closeDialog$ = action
        .pipe(
          ofType(closeDialog),
          filter(({ withConfirmation }) => withConfirmation)
        ),
      filter$ = state
        .pipe(
          observeOn(asapScheduler),
          map(state => state.dialog.result)
        );

    return closeDialog$
      .pipe(
        withLatestFrom(filter$),
        map(([, filters]) => filters),
        map(setFilter),
        first()
      );
  }

export default ofCloseDialogConfirmFilters;
