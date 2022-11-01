import * as React from 'react';
import { default as _ } from './main.css';
import { useStore } from '@/store';

import ViewFilterSection from './common/component.view-filter-section';
import PrimaryIconWrapper from '@/common/structures/wrappers/primary-icon';
import Icon from '@/common/structures/wrappers/common/component.icon';
import FlatWrapper from '@/common/structures/wrappers/flat';
import ArrowIcon from '@/common/svgs/arrow';
import CategoryIcon from '@/common/svgs/category';
import DateIcon from '@/common/svgs/date';
import FlatButton from '@/common/structures/buttons/flat';
import SecondaryLabel from '@/common/structures/labels/secondary';
import Inline from '@/common/structures/inline';
import PrimaryContainer from '@/common/structures/containers/primary';
import SecondaryContainer from '@/common/structures/containers/secondary';
import { nextInTransitionView } from '@/store/action'; import { rootSideMenuId } from '@/common/components/sides/root';
import fromFiltersState from '@/common/renders/from-filters-state';

const base = [
  _["filter"],
  _["filter--root"],
].join(' ');

const sectionBase = _["filter__section"];

export default function ViewFilter() {
  const { useRenderPipeline, dispatch } = useStore(),
    render = useRenderPipeline(
      fromFiltersState(([filters]) => ({
        Filters:
          filters.map((filter, index) =>
            <ViewFilterSection key={index} index={index}>
              <>
                {filter.categories.map(categories =>
                  <FlatWrapper key={categories.id}>
                    <PrimaryContainer>
                      <Inline>
                        <PrimaryIconWrapper>
                          <Icon>
                            <CategoryIcon />
                          </Icon>
                        </PrimaryIconWrapper>
                        <SecondaryContainer>
                          <SecondaryLabel>
                            {categories.display}
                          </SecondaryLabel>
                        </SecondaryContainer>
                      </Inline>
                    </PrimaryContainer>
                  </FlatWrapper>)}
                {filter.dates.map(date =>
                  <FlatWrapper key={date.id}>
                    <PrimaryContainer>
                      <Inline>
                        <PrimaryIconWrapper>
                          <Icon>
                            <DateIcon />
                          </Icon>
                        </PrimaryIconWrapper>
                        <SecondaryContainer>
                          <SecondaryLabel>
                            {date.display}
                          </SecondaryLabel>
                        </SecondaryContainer>
                      </Inline>
                    </PrimaryContainer>
                  </FlatWrapper>)}
              </>
            </ViewFilterSection >
          )
      })),
      { Filters: null }
    );

  return (
    <div className={base}>
      <div className={sectionBase}>
        <FlatButton onClick={() => dispatch(nextInTransitionView({ id: rootSideMenuId }))}>
          <PrimaryContainer>
            <Inline>
              <PrimaryIconWrapper>
                <Icon>
                  <ArrowIcon style={{ transform: 'rotate(90deg)' }} />
                </Icon>
              </PrimaryIconWrapper>
              <SecondaryContainer>
                <SecondaryLabel>
                  New filter group
                </SecondaryLabel>
              </SecondaryContainer>
            </Inline>
          </PrimaryContainer>
        </FlatButton>
      </div>
      {render.Filters}
    </div>
  );
}
