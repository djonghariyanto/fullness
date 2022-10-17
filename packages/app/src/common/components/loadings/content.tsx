import * as React from 'react';

import { default as _ } from './main.css';
import { useStore } from '@/store';
import fromLoadingState from '@/common/renders/from-loading-state';

const base = [
  _["loading"],
  _["loading--content"]
].join(' ');

function Loading() {
  return (
    <div className={base}>
      ..............loading 
    </div>
  );
}

export default function ContentLoading() {
  const { useRenderPipeline } = useStore(),
    render = useRenderPipeline(
      fromLoadingState(loading => ({
        Content: loading
          ? <Loading />
          : null
      })),
      { Content: null }
    );

  return render.Content;
}

