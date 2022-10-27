import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import fromMenuSideState from '@/common/renders/from-menu-side-state';
import fromPageMenuSideOption from '@/common/renders/from-page-menu-side-option';
import Wrapper from './common/component.wrapper';

export default function MenuPopup() {
  const { useRenderPipeline } = useStore(),

    render = useRenderPipeline(
      [
        fromMenuSideState(([hasActivated]) => ({
          MenuSide: hasActivated ? <Wrapper /> : null
        })),
        fromPageMenuSideOption(isAccessible => isAccessible
          ? null
          : { MenuSide: null }
        )
      ],
      { MenuSide: null }
    );

  return render.MenuSide;
}
