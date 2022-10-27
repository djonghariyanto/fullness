import * as React from 'react';
import { default as _ } from '../main.css';

import { useStore } from '@/store';
import { addFilter, gotoSearchResultIndex } from '@/store/action';
import SearchIcon from '@/common/svgs/search';
import FlatButton from '@/common/structures/btns/flat';
import Inline from '@/common/structures/inline';
import SecondaryContainer from '@/common/structures/containers/secondary';
import SecondaryLabel from '@/common/structures/labels/secondary';
import PrimaryIconWrapper from '@/common/structures/wrappers/primary-icon';
import Icon from '@/common/structures/wrappers/common/component.icon';
import BindBehavior from '@/common/components/binds/behavior';
import fromSearchPopupState from '@/common/renders/from-search-popup-state';
import onKeypress from '@/common/dispatches/on-keypress';
import searchKeyReducer from './common/util.search-key-reducer';
import preventDefaultReducer from './common/util.prevent-default-reducer';
import onInit from './dispatches/on-init';
import ofSubStoreProcessAction from './dispatches/of-sub-store-process-action';
import fromStoreSelectItem from './renders/from-store-select-item';
import fromStoreUpdateInput from './effects/from-store-update-input';

const base = _["popup--search"];

export default function SearchResultPopup() {
  const { usePipeline, useRenderPipeline, useDispatchPipeline, dispatch } = useStore(),
    render = useRenderPipeline(
      fromSearchPopupState(([, state]) => ({
        List: state.result?.slice(1).map((filter, key) => {
          return <BindBehavior
            key={key}
            onObserve={fromStoreSelectItem(key + 1)}
          >
            <FlatButton
              onMouseOver={() => dispatch(gotoSearchResultIndex({ index: key + 1, shouldUpdate: false }))}
              onClick={() => dispatch(addFilter({
                id: filter,
                display: filter
              }))}
            >
              <Inline>
                <PrimaryIconWrapper>
                  <Icon>
                    <SearchIcon />
                  </Icon>
                </PrimaryIconWrapper>
                <SecondaryContainer>
                  <SecondaryLabel>
                    {filter}
                  </SecondaryLabel>
                </SecondaryContainer>
              </Inline>
            </FlatButton>
          </BindBehavior>
        })
      })),
      { List: [] }
    );

  usePipeline(
    fromStoreUpdateInput()
  );

  useDispatchPipeline(
    [
      onInit(),
      onKeypress(searchKeyReducer, preventDefaultReducer),
      ofSubStoreProcessAction(),
    ],
  );

  return (
    <div className={base}>
      {render.List}
    </div>
  );
}
