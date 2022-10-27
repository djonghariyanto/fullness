import * as React from 'react';
import { default as _ } from '../main.css'; import { useStore } from '@/store';

import TransitionView from '@/common/components/transition-view';
import EditFilter from '@/common/components/filters/edit';
import ViewFilter from '@/common/components/filters/view';
import ofNextViewTransitionSelectEditFilterMode from './dispatches/of-next-view-transition-select-edit-filter-mode';
import ofPreviousViewTransitionRemoveEmptyFilter from './dispatches/of-previous-view-transition-remove-empty-filter'; 
import ofCloseMenuSideRemoveEmptyFilter from './dispatches/of-close-menu-side-remove-empty-filter'; 
import ofActivateDialogSetTransitionViewIndex from './dispatches/of-activate-dialog-set-transition-view-index';
import ofAddFilterProcessSearch from './dispatches/of-add-filter-process-search';
import ofAddFilterResetInput from './dispatches/of-add-filter-reset-input'; 
import ofViewTransitionSetFilterMode from './dispatches/of-view-transition-set-filter-mode'; 
import ofCommitSubStoreAddFilter from './dispatches/of-commit-sub-store-add-filter';
import onInit from './dispatches/on-init';
import ofSubStoreBlurInput from './effects/of-sub-store-blur-input';
import ofSubStorePrevTransitionView from './dispatches/of-sub-store-prev-transition-view';
import keySearchReducer from './common/util.key-search-reducer';
import onKeypress from '@/common/dispatches/on-keypress';
import ofSubStoreFetchSearch from './dispatches/of-sub-store-fetch-search';
import FilterGroup from '@/common/components/filter-group';

const base = [
  _["side"],
  _["side--root"],
].join(' ');

const rootSideMenuId = 'side-root-transition-view';
const RootSideContext = React.createContext(null);

export { rootSideMenuId, RootSideContext }


export default function RootMenuSide() {
  const { usePipeline, useDispatchPipeline } = useStore();

  usePipeline(
    ofSubStoreBlurInput()
  );

  useDispatchPipeline(
    [
      onInit(),
      ofAddFilterResetInput(),
      onKeypress(keySearchReducer),
      ofAddFilterProcessSearch(),
      ofCommitSubStoreAddFilter(),
      ofSubStoreFetchSearch(),
      ofSubStorePrevTransitionView(),
      ofViewTransitionSetFilterMode(),
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
