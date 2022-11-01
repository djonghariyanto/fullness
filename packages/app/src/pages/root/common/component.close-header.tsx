import * as React from 'react';
import { default as _ } from '../main.css';
import { useStore } from '@/store';
import { fetchEvent } from '@/store/action';
import PrimaryContainer from '@/common/structures/containers/primary';
import SecondaryContainer from '@/common/structures/containers/secondary';
import PrimaryWrapper from '@/common/structures/wrappers/primary';
import SecondaryWrapper from '@/common/structures/wrappers/secondary';
import PrimaryLabel from '@/common/structures/labels/primary';
import SecondaryLabel from '@/common/structures/labels/secondary';
import PrimaryLink from '@/common/structures/links/primary';
import fromStateGetFilters from '../renders/from-state-get-filters';

const filterChild = _["root__filter"];

export default function CloseHeader() {
  const { useRenderPipeline, dispatch } = useStore(),
    render = useRenderPipeline(
      fromStateGetFilters(),
      { filters: null }
    );

  return (
    <div className={filterChild}>
      <PrimaryWrapper>
        <PrimaryContainer>
          <PrimaryLabel>
            {render?.filters?.join(' \u2022 ')}
          </PrimaryLabel>
        </PrimaryContainer>
      </PrimaryWrapper>
      <SecondaryWrapper>
        <SecondaryContainer>
          <SecondaryLabel>
            Showing any matches, <PrimaryLink onClick={() => dispatch(fetchEvent())}>delete</PrimaryLink>
          </SecondaryLabel>
        </SecondaryContainer>
      </SecondaryWrapper>
    </div>
  );
}
