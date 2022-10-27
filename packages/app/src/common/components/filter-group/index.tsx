import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import { closeDialog } from '@/store/action';
import { nextInTransitionView } from '@/store/action';
import OpaqueIconButton from '@/common/components/buttons/opaque-icon';
import PrimaryIconButton from '@/common/structures/buttons/primary-icon';
import IconWrapper from '@/common/components/wrappers/icon';
import TransitionView, { TransitionViewWrapper } from '@/common/components/transition-view';
import DefaultCategory from '@/common/components/categories/default';
import DefaultCalender from '@/common/components/calenders/default';
import TouchWrapper from '@/common/components/wrappers/touch';
import Inline, { InlineItem } from '@/common/structures/inline';
import NavigationItemLabel from '@/common/components/labels/navigation-item';
import SignIcon from '@/common/svgs/sign';
import TickIcon from '@/common/svgs/tick';
import ofSubStore from './dispatches/of-sub-store';
import ofCloseDialogConfirmFilters from './dispatches/of-close-dialog-confirm-filters';

const base = [
  _["filter-group"],
  _["filter-group--dialog"]
].join(' ');

const headerChild = _["filter-group__header"];
const contentChild = _["filter-group__content"];

const filterGroupId = 'filter-group';
const filterTitleId = 'filter-title';
export { filterTitleId, filterGroupId }

export default function FilterGroup() {
  const { useDispatchPipeline, dispatch } = useStore();

  useDispatchPipeline(
    [
      ofSubStore(),
      ofCloseDialogConfirmFilters()
    ]
  );

  return (
    <div className={base}>
      <div className={headerChild}>
        <Inline selector="apart">
          <InlineItem>
            <TransitionViewWrapper style={{ width: '160px' }}>
              <TransitionView id={filterTitleId}>
                <TouchWrapper>
                  <NavigationItemLabel>
                    CATEGORY
                  </NavigationItemLabel>
                </TouchWrapper>
                <TouchWrapper>
                  <NavigationItemLabel>
                    DATE
                  </NavigationItemLabel>
                </TouchWrapper>
              </TransitionView>
            </TransitionViewWrapper>
          </InlineItem>
          <InlineItem>
            <OpaqueIconButton
              onClick={() => dispatch(nextInTransitionView({ id: [filterTitleId, filterGroupId] }))}
            >
              <IconWrapper style={{ cursor: 'unset' }}>
                <SignIcon />
              </IconWrapper>
            </OpaqueIconButton>
            <PrimaryIconButton
              onClick={() => dispatch(closeDialog({ withConfirmation: true }))}
            >
              <TickIcon />
            </PrimaryIconButton>
          </InlineItem>
        </Inline>
      </div>
      <div className={contentChild}>
        <TransitionView id={filterGroupId} observe={true}>
          <DefaultCategory/>
          <DefaultCalender/>
        </TransitionView>
      </div>
    </div>
  );
}
