import * as React from 'react';
import { default as _ } from '../main.css';
import { useStore } from '@/store';
import { fetchEvent } from '@/store/action';
import PrimaryLabel from '@/common/structures/labels/primary';
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
      <div>
        <PrimaryLabel>
          {render?.filters?.join(', ')}
        </PrimaryLabel>
        <div>
          Showing any matches, <PrimaryLink onClick={() => dispatch(fetchEvent())}>delete</PrimaryLink>
        </div>
      </div>
    </div>
  );
}
