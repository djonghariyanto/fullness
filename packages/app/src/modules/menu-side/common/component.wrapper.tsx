import * as React from 'react';
import { default as _ } from '../main.css';
import { useStore } from '@/store';
const base = _["menu-side"];
const childContent = _["menu-side__content"];
import onKeypress from '@/common/dispatches/on-keypress';
import keyHandler from '../common/util.key-handler';
import fromMenuSideState from '@/common/renders/from-menu-side-state';

export default function Wrapper() {
  const { useDispatchPipeline, useRenderPipeline } = useStore(),
    render = useRenderPipeline(
      [
        fromMenuSideState(([, menuSide]) => ({
          MenuSide: menuSide.Component
        }))
      ],
      { MenuSide: null }
    );

  useDispatchPipeline(onKeypress(keyHandler));

  return (
    <div className={base}>
      <div className={childContent}>
        {render.MenuSide}
      </div>
    </div>
  );
}
