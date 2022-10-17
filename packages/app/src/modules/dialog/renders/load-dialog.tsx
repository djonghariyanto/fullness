import * as React from 'react';
import { Store } from '@/store';
import { map, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';

import { Render, DialogWrapper } from '../';

const loadDialog = () =>
  ({ state }: Store) => {
    const dialog$ = state
      .pipe(
        map(state => state.dialog)
      );

    return state
      .pipe(
        map(state => state.status.hasDialogActivated),
        distinctUntilChanged(),
        withLatestFrom(dialog$),
        map(([hasDialogActivated, dialog]) => (render: Render) => ({
          ...render,
          Content: hasDialogActivated 
            ? 
              <DialogWrapper withClose={dialog.withClose}>
                {dialog.Component}
              </DialogWrapper> 
            : null
        }))
      );
  }

export default loadDialog;
