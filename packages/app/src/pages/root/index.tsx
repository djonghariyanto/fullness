import * as React from 'react';
import { Props } from '../';

import { default as _ } from './main.css';
import { useStore } from '@/store';
import onInitLoadMenuSide from '@/common/dispatches/on-init-load-menu-side';
import fromFilterStateRenderClose from './renders/from-filter-state-render-close';
import ofFetchEvent from './dispatches/of-fetch-event';
import CloseHeader from './common/component.close-header';

import RootMenuSide from '@/common/components/sides/root';
import ResponsiveEventCardList from '@/common/components/responsive-event-card-list';
import onInitFetchEvent from './dispatches/on-init-fetch-event';

const base = _["root"];
const contentChild = _["root__content"];

export default function Root(props: Props): React.ReactElement {
  const { useRenderPipeline, useDispatchPipeline } = useStore(),
    render = useRenderPipeline(
      [
        fromFilterStateRenderClose(<CloseHeader />)
      ],
      { Close: null }
    );

  useDispatchPipeline(
    [
      onInitLoadMenuSide(<RootMenuSide />),
      ofFetchEvent(),
      onInitFetchEvent()
    ]
  );

  return (
    <div className={base} {...props}>
      {render.Close}
      <div className={contentChild}>
        <ResponsiveEventCardList />
      </div>
    </div>
  );
}
