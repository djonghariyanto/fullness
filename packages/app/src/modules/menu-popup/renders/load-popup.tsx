import * as React from 'react';
import { Store } from '@/store';
import { map, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';

import { Render, MenuPopupWrapper } from '../';

const loadPopup = () =>
  ({ state }: Store) => {
    const popup$ = state
      .pipe(
        map(state => state.menuPopup)
      );

    return state
      .pipe(
        map(state => state.status.hasMenuPopupActivated),
        distinctUntilChanged(),
        withLatestFrom(popup$),
        map(([hasMenuPopupActivated, menuPopup]) => (render: Render) => ({
          ...render,
          Content: hasMenuPopupActivated
            ? <MenuPopupWrapper>{menuPopup.Component}</MenuPopupWrapper> 
            : null
        }))
      );
  }

export default loadPopup;
