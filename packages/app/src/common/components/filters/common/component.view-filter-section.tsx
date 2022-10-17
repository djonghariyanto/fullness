import * as React from 'react';
import { default as _ } from '../main.css';
import { useStore } from '@/store';

import IconWrapper, { Icon } from '@/common/structures/wrappers/icon';
import SearchIcon from '@/common/svgs/search';
import EditIcon from '@/common/svgs/edit';
import OnOffIcon from '@/common/svgs/onoff';
import TouchWrapper from '@/common/components/wrappers/touch';
import FlatButton from '@/common/structures/btns/flat';
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
      <PrimaryContainer>
        <TouchWrapper>
          <PrimaryLabel>
            FILTER {props.index + 1}
          </PrimaryLabel>
        </TouchWrapper>
      </PrimaryContainer>
      <FlatButton
        onClick={() => dispatch(fetchEvent({ index: props.index }))}
      >
        <PrimaryContainer>
          <Inline>
            <IconWrapper>
              <Icon>
                <SearchIcon />
              </Icon>
            </IconWrapper>
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
          <IconWrapper selected={render.selected}>
              <Icon style={render.selected ? { transform: 'rotate(180deg)' } : null}>
                <OnOffIcon />
              </Icon>
            </IconWrapper>
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
            <IconWrapper>
              <Icon>
                <EditIcon />
              </Icon>
            </IconWrapper>
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
