import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import fromPageMenuSideOption from './renders/from-page-menu-side-option';
import Wrapper from './common/component.wrapper';

export default function MenuPopup() {
  const { useRenderPipeline } = useStore(),

    render = useRenderPipeline(
      fromPageMenuSideOption(<Wrapper />),
      { MenuSide: null }
    );

  return render.MenuSide;
}
