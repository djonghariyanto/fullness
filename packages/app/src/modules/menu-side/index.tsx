import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import fromMenuSideState from '@/common/renders/from-menu-side-state';
import fromPageMenuSideOption from '@/common/renders/from-page-menu-side-option';

const base = _["menu-side"];
const childContent = _["menu-side__content"];

export default function MenuPopup() {
  const { useRenderPipeline } = useStore(),

    render = useRenderPipeline(
      [
        fromMenuSideState(([hasActivated, menuSide]) => ({
          MenuSide: hasActivated
            ?
            <div className={base}>
              <div className={childContent}>
                {menuSide.Component}
              </div>
            </div>
            : null
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
