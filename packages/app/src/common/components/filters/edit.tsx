import * as React from 'react';
import { default as _ } from './main.css'; import { useStore } from '@/store';
import { activateDialog, previousInTransitionView, setFilter } from '@/store/action';
import { FilterItem } from '@/store/state';
import PrimaryIconWrapper from '@/common/structures/wrappers/primary-icon';
import Icon from '@/common/structures/wrappers/common/component.icon';
import AddIcon from '@/common/svgs/add';
import DashIcon from '@/common/svgs/dash';
import ArrowIcon from '@/common/svgs/arrow';
import FlatButton from '@/common/structures/buttons/flat';
import PrimaryLabel from '@/common/structures/labels/primary';
import SecondaryLabel from '@/common/structures/labels/secondary';
import Inline from '@/common/structures/inline';
import PrimaryContainer from '@/common/structures/containers/primary';
import SecondaryContainer from '@/common/structures/containers/secondary';
import SearchInput from '@/common/components/input-texts/search';
import FlatWrapper from '@/common/structures/wrappers/flat';
import fromEditFilterIndexStatus from './renders/from-edit-filter-index-status';
import { rootSideMenuId, RootSideContext } from '@/common/components/sides/root';
import { increaseOne } from '@/common/utils';

export interface Render {
  Categories: React.ReactElement[],
  Dates: React.ReactElement[]
}

const generator = increaseOne(0);

const base = [
  _["filter"],
  _["filter--root"],
].join(' ');

const sectionBase = _["filter__section"];
const sectionWithDividerBase = [
  _["filter__section"],
  _["filter__section--top-divider"]
].join(' ');

const removeItemFromFilter = (list: FilterItem[], item: FilterItem) => list.filter(i => i.id !== item.id);

export default function EditFilter() {
  const { useRenderPipeline, dispatch } = useStore(),
    FilterGroup = React.useContext(RootSideContext),

    render = useRenderPipeline<Render>(
      [
        fromEditFilterIndexStatus<Render>(([filters, index]) => ({
          Categories: filters[index]?.categories.map(category =>
            <FlatButton
              key={category.id}
              onClick={() => dispatch(setFilter({ categories: removeItemFromFilter(filters[index].categories, category) }))}
            >
              <PrimaryContainer>
                <Inline>
                  <PrimaryIconWrapper>
                    <Icon>
                      <DashIcon />
                    </Icon>
                  </PrimaryIconWrapper>
                  <SecondaryContainer>
                    <SecondaryLabel>
                      {category.display}
                    </SecondaryLabel>
                  </SecondaryContainer>
                </Inline>
              </PrimaryContainer>
            </FlatButton>
          )
        })),
        fromEditFilterIndexStatus<Render>(([filters, index]) => ({
          Dates: filters[index]?.dates.map(date =>
            <FlatButton
              key={date.id}
              onClick={() => dispatch(setFilter({ dates: removeItemFromFilter(filters[index].dates, date) }))}
            >
              <PrimaryContainer>
                <Inline>
                  <PrimaryIconWrapper>
                    <Icon>
                      <DashIcon />
                    </Icon>
                  </PrimaryIconWrapper>
                  <SecondaryContainer>
                    <SecondaryLabel>
                      {date.display}
                    </SecondaryLabel>
                  </SecondaryContainer>
                </Inline>
              </PrimaryContainer>
            </FlatButton>
          )
        }))
      ],
      { Categories: null, Dates: null }
    );

  return (
    <div className={base}>
      <div className={sectionBase}>
        <FlatButton
          onClick={() => dispatch(previousInTransitionView({ id: rootSideMenuId }))}
        >
          <PrimaryContainer>
            <Inline>
              <PrimaryIconWrapper>
                <Icon>
                  <ArrowIcon style={{ transform: 'rotate(-90deg)' }} />
                </Icon>
              </PrimaryIconWrapper>
              <SecondaryContainer>
                <SecondaryLabel>
                  Done
                </SecondaryLabel>
              </SecondaryContainer>
            </Inline>
          </PrimaryContainer>
        </FlatButton>
      </div>
      <div className={sectionWithDividerBase}>
        <FlatWrapper>
          <PrimaryContainer>
            <PrimaryLabel>
              SEARCH KEYWORD
            </PrimaryLabel>
          </PrimaryContainer>
        </FlatWrapper>
        <PrimaryContainer>
          <SearchInput onGenerate={generator} />
        </PrimaryContainer>
      </div>
      <div className={sectionWithDividerBase}>
        <FlatWrapper>
          <PrimaryContainer>
            <PrimaryLabel>
              CATEGORY
            </PrimaryLabel>
          </PrimaryContainer>
        </FlatWrapper>
        <FlatButton
          onClick={() => dispatch(activateDialog({ Component: FilterGroup, payload: 1 }))}
        >
          <PrimaryContainer>
            <Inline>
              <PrimaryIconWrapper>
                <Icon>
                  <AddIcon />
                </Icon>
              </PrimaryIconWrapper>
              <SecondaryContainer>
                <SecondaryLabel>
                  Add new category
                </SecondaryLabel>
              </SecondaryContainer>
            </Inline>
          </PrimaryContainer>
        </FlatButton>
        {render.Categories}
      </div>
      <div className={sectionWithDividerBase}>
        <FlatWrapper>
          <PrimaryContainer>
            <PrimaryLabel>
              DAY STATUS
            </PrimaryLabel>
          </PrimaryContainer>
        </FlatWrapper>
        <FlatButton
          onClick={() => dispatch(activateDialog({ Component: null }))}
        >
          <PrimaryContainer>
            <Inline>
              <PrimaryIconWrapper>
                <Icon>
                  <AddIcon />
                </Icon>
              </PrimaryIconWrapper>
              <SecondaryContainer>
                <SecondaryLabel>
                  Add new day filter
                </SecondaryLabel>
              </SecondaryContainer>
            </Inline>
          </PrimaryContainer>
        </FlatButton>
      </div>
      <div className={sectionWithDividerBase}>
          <FlatWrapper>
        <PrimaryContainer>
            <PrimaryLabel>
              FIND BY DATE
            </PrimaryLabel>
        </PrimaryContainer>
          </FlatWrapper>
        <FlatButton
          onClick={() => dispatch(activateDialog({ Component: FilterGroup, payload: 2 }))}
        >
          <PrimaryContainer>
            <Inline>
              <PrimaryIconWrapper>
                <Icon>
                  <AddIcon />
                </Icon>
              </PrimaryIconWrapper>
              <SecondaryContainer>
                <SecondaryLabel>
                  Add new date
                </SecondaryLabel>
              </SecondaryContainer>
            </Inline>
          </PrimaryContainer>
        </FlatButton>
        {render.Dates}
      </div>
    </div>
  );
}
