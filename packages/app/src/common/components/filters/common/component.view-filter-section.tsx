import * as React from 'react';
import { default as _ } from '../main.css';
import { useStore } from '@/store';

import PrimaryIconWrapper from '@/common/structures/wrappers/primary-icon';
import Icon from '@/common/structures/wrappers/common/component.icon';
import SearchIcon from '@/common/svgs/search';
import EditIcon from '@/common/svgs/edit';
import OnOffIcon from '@/common/svgs/onoff';
import FlatWrapper from '@/common/structures/wrappers/flat';
import FlatButton from '@/common/structures/buttons/flat';
import PrimaryLabel from '@/common/structures/labels/primary';
import SecondaryLabel from '@/common/structures/labels/secondary';
import Inline from '@/common/structures/inline';
import PrimaryContainer from '@/common/structures/containers/primary';
import SecondaryContainer from '@/common/structures/containers/secondary';
import { toggleFilterMatch, nextInTransitionView, fetchEvent } from '@/store/action';
import { rootSideMenuId } from '@/common/components/sides/root';
import fromFiltersState from '@/common/renders/from-filters-state';

export interface Props {
  style?: React.CSSProperties,
  index: number,
  children: React.ReactElement | React.ReactElement[]
}

const sectionWithDividerBase = [
  _["filter__section"],
  _["filter__section--top-divider"]
].join(' ');

export default function ViewFilterSection(props: Props) {
  const { useRenderPipeline, dispatch } = useStore(),
    render = useRenderPipeline(
      fromFiltersState(([filters]) => ({
        selected: filters[props.index].matchAll
      })),
      { selected: null }
    );

  return (
    <div className={sectionWithDividerBase} {...props}>
      <FlatWrapper>
        <PrimaryContainer>
          <PrimaryLabel>
            FILTER {props.index + 1}
          </PrimaryLabel>
        </PrimaryContainer>
      </FlatWrapper>
      <FlatButton
        onClick={() => dispatch(fetchEvent({ index: props.index }))}
      >
        <PrimaryContainer>
          <Inline>
            <PrimaryIconWrapper>
              <Icon>
                <SearchIcon />
              </Icon>
            </PrimaryIconWrapper>
            <SecondaryContainer>
              <SecondaryLabel>
                Search event
              </SecondaryLabel>
            </SecondaryContainer>
          </Inline>
        </PrimaryContainer>
      </FlatButton>
      <FlatButton
        onClick={() => dispatch(toggleFilterMatch(props.index))}
      >
        <PrimaryContainer>
          <Inline>
            <PrimaryIconWrapper selected={render.selected}>
              <Icon style={render.selected ? { transform: 'rotate(180deg)' } : null}>
                <OnOffIcon />
              </Icon>
            </PrimaryIconWrapper>
            <SecondaryContainer>
              <SecondaryLabel>
                Match all
              </SecondaryLabel>
            </SecondaryContainer>
          </Inline>
        </PrimaryContainer>
      </FlatButton>
      <FlatButton
        onClick={() => dispatch(nextInTransitionView({ id: rootSideMenuId, payload: props.index }))}
      >
        <PrimaryContainer>
          <Inline>
            <PrimaryIconWrapper>
              <Icon>
                <EditIcon />
              </Icon>
            </PrimaryIconWrapper>
            <SecondaryContainer>
              <SecondaryLabel>
                Edit this filters
              </SecondaryLabel>
            </SecondaryContainer>
          </Inline>
        </PrimaryContainer>
      </FlatButton>
      {props.children}
    </div>
  );
}
