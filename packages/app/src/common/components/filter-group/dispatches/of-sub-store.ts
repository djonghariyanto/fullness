import { map, filter, scan, switchMap, first, concat, of } from 'rxjs';

import { Store, ofType } from '@/store';
import { updateDialogResult } from '@/store/action';
import { initialState } from '../store';
import * as allAction from '../store/action';
import { subStore } from '@/store/action';
import reducer from '../store/reducer';

const ofSubType = () =>
  ({ state, action }: Store) => {
    const actions: string[] = Object.values(allAction),
      init$ = state
        .pipe(
          map(state => state.filters.length === state.status.editFilterIndex
            ? initialState
            : state.filters[state.status.editFilterIndex]
          ),
          first()
        ),
      sub$ = action
        .pipe(
          ofType(subStore),
          filter(({ type }) => actions.includes(type)),
        );

    return init$
      .pipe(
        switchMap(initialFilterState =>
          concat(of({ type: 'init' }), sub$)
            .pipe(
              scan(reducer, { ...initialFilterState }),
              map(result => ({ result })),
              map(updateDialogResult)
            )
        )
      );
  }

export default ofSubType;
