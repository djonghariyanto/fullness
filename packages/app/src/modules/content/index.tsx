import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import fromMenuSideState from '@/common/renders/from-menu-side-state';
import fromPageMenuSideOption from '@/common/renders/from-page-menu-side-option';
import fromPageStateRenderCurrentPage from './renders/from-page-state-render-current-page';
import ofLoadPathDoVerifyPath from './dispatches/of-load-path-do-verify-path';
import onPopstateDispatchLoadPath from './dispatches/on-popstate-dispatch-load-path';
import ofCommitPageUpdateLocationHistory from './effects/of-commit-page-update-location-history';

interface Props {
  children: React.ReactElement[]
}

export interface Render {
  CurrentPage: React.ReactElement,
  className: string
}

const base = _["content"];
const adjustedBase = [base, _["content--menu-side-activated"]].join(' ');

export default function Content(props: Props) {
  const { useRenderPipeline, usePipeline, useDispatchPipeline } = useStore(),

    render = useRenderPipeline<Render>(
      [
        fromPageStateRenderCurrentPage(props.children),
        fromMenuSideState<Render>(([hasActivated]) => ({
          className: hasActivated ? adjustedBase : base
        })),
        fromPageMenuSideOption(([accessible, activated]) => accessible && activated
          ? { className: adjustedBase }
          : { className: base }
        ),
      ],
      { CurrentPage: null, className: base }
    );

  usePipeline(
    ofCommitPageUpdateLocationHistory()
  );

  useDispatchPipeline(
    [
      onPopstateDispatchLoadPath(),
      ofLoadPathDoVerifyPath(),
    ]
  );

  return (
    <div className={render.className}>
      {render.CurrentPage}
    </div>
  );
}
