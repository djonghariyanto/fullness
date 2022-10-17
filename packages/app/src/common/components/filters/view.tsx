import * as React from 'react';
import { default as _ } from './main.css';
import { useStore } from '@/store';

import ViewFilterSection from './common/component.view-filter-section';
import IconWrapper, { Icon } from '@/common/structures/wrappers/icon';
import TouchWrapper from '@/common/components/wrappers/touch';
import ArrowIcon from '@/common/svgs/arrow';
import CategoryIcon from '@/common/svgs/category';
import DateIcon from '@/common/svgs/date';
import FlatButton from '@/common/structures/btns/flat';
import SecondaryLabel from '@/common/structures/labels/secondary';
import Inline from '@/common/structures/inline';
import PrimaryContainer from '@/common/structures/containers/primary';
import SecondaryContainer from '@/common/structures/containers/secondary';
import SearchIcon from '@/common/svgs/search';
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
                  <PrimaryContainer key={categories.id}>
                    <TouchWrapper>
                      <Inline>
                        <IconWrapper>
                          <Icon>
                            <CategoryIcon />
                          </Icon>
                        </IconWrapper>
                        <SecondaryContainer>
                          <SecondaryLabel>
                            {categories.display}
                          </SecondaryLabel>
                        </SecondaryContainer>
                      </Inline>
                    </TouchWrapper>
                  </PrimaryContainer>)}
                {filter.dates.map(date =>
                  <PrimaryContainer key={date.id}>
                    <TouchWrapper>
                      <Inline>
                        <IconWrapper>
                          <Icon>
                            <DateIcon />
                          </Icon>
                        </IconWrapper>
                        <SecondaryContainer>
                          <SecondaryLabel>
                            {date.display}
                          </SecondaryLabel>
                        </SecondaryContainer>
                      </Inline>
                    </TouchWrapper>
                  </PrimaryContainer>)}
              </>
            </ViewFilterSection>
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
              <IconWrapper>
                <Icon>
                  <ArrowIcon style={{ transform: 'rotate(90deg)' }} />
                </Icon>
              </IconWrapper>
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
