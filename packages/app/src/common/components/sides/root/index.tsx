import * as React from 'react';
import { default as _ } from '../main.css';
import { useStore } from '@/store';

import TransitionView from '@/common/components/transition-view';
import EditFilter from '@/common/components/filters/edit';
import ViewFilter from '@/common/components/filters/view';
import ofNextViewTransitionSelectEditFilterMode from './dispatches/of-next-view-transition-select-edit-filter-mode';
import ofPreviousViewTransitionRemoveEmptyFilter from './dispatches/of-previous-view-transition-remove-empty-filter';
import ofCloseMenuSideRemoveEmptyFilter from './dispatches/of-close-menu-side-remove-empty-filter';
import ofActivateDialogSetTransitionViewIndex from './dispatches/of-activate-dialog-set-transition-view-index';
import onInit from './dispatches/on-init';
import FilterGroup from '@/common/components/filter-group';

const base = [
  _["side"],
  _["side--root"],
].join(' ');

const rootSideMenuId = 'side-root-transition-view';
const RootSideContext = React.createContext(null);

export { rootSideMenuId, RootSideContext }


export default function RootMenuSide() {
  const { useDispatchPipeline } = useStore();

  useDispatchPipeline(
    [
      onInit(),
      ofNextViewTransitionSelectEditFilterMode(),
      ofPreviousViewTransitionRemoveEmptyFilter(),
      ofCloseMenuSideRemoveEmptyFilter(),
      ofActivateDialogSetTransitionViewIndex()
    ]
  );

  return (
    <RootSideContext.Provider value={<FilterGroup />}>
      <div className={base}>
        <TransitionView id={rootSideMenuId}>
          <ViewFilter />
          <EditFilter />
        </TransitionView>
      </div >
    </RootSideContext.Provider>
  );
}
