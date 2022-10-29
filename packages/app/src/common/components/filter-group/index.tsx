import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import { closeDialog } from '@/store/action';
import { nextInTransitionView } from '@/store/action';
import SecondaryContainer from '@/common/structures/containers/secondary';
import FlatButton from '@/common/structures/buttons/flat';
import PrimaryButton from '@/common/structures/buttons/primary';
import Icon from '@/common/structures/wrappers/common/component.icon';
import PrimaryIconWrapper from '@/common/structures/wrappers/primary-icon';
import SecondaryIconWrapper from '@/common/structures/wrappers/secondary-icon';
import TransitionView, { TransitionViewWrapper } from '@/common/components/transition-view';
import DefaultCategory from '@/common/components/categories/default';
import DefaultCalender from '@/common/components/calenders/default';
import FlatWrapper from '@/common/structures/wrappers/flat';
import Inline, { InlineItem } from '@/common/structures/inline';
import PrimaryLabel from '@/common/structures/labels/primary';
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
                <FlatWrapper>
                  <PrimaryLabel>
                    CATEGORY
                  </PrimaryLabel>
                </FlatWrapper>
                <FlatWrapper>
                  <PrimaryLabel>
                    DATE
                  </PrimaryLabel>
                </FlatWrapper>
              </TransitionView>
            </TransitionViewWrapper>
          </InlineItem>
          <InlineItem>
            <SecondaryContainer>
              <FlatButton
                onClick={() => dispatch(nextInTransitionView({ id: [filterTitleId, filterGroupId] }))}
              >
                <SecondaryIconWrapper>
                  <Icon>
                    <SignIcon />
                  </Icon>
                </SecondaryIconWrapper>
              </FlatButton>
            </SecondaryContainer>
            <PrimaryButton
              onClick={() => dispatch(closeDialog({ withConfirmation: true }))}
            >
              <PrimaryIconWrapper>
                <Icon>
                  <TickIcon />
                </Icon>
              </PrimaryIconWrapper>
            </PrimaryButton>
          </InlineItem>
        </Inline>
      </div>
      <div className={contentChild}>
        <TransitionView id={filterGroupId} observe={true}>
          <DefaultCategory />
          <DefaultCalender />
        </TransitionView>
      </div>
    </div>
  );
}
