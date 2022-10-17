import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import { loadPath } from '@/store/action';

import { toggleMenuSide } from '@/store/action';
import fromPageMenuSideOption from '@/common/renders/from-page-menu-side-option';
import fromSessionState from '@/common/renders/from-session-state';
import AuthorizedNavigation from '@/common/components/navigations/authorized';
import UnauthorizedNavigation from '@/common/components/navigations/unauthorized';
import TouchButton from '@/common/components/buttons/touch';
import DJIcon from '@/common/svgs/dj-icon';
import OptionIcon from '@/common/svgs/option';

const base = _["header"];
const iconBase = _["header__icon"];
const navBase = _["header__nav"];
const reverseBase = _["header__nav__reverse"];

interface Render {
  NavigationComponent: React.ReactElement,
  MenuSideButton: React.ReactElement
}

export default function Header() {
  const { dispatch, useRenderPipeline } = useStore(),

    render = useRenderPipeline<Render>(
      [
        fromSessionState<Render>(([authenticated]) => ({
          NavigationComponent: authenticated
            ? <AuthorizedNavigation />
            : <UnauthorizedNavigation />
        })),
        fromPageMenuSideOption<Render>(isAccesible => ({
          MenuSideButton: isAccesible
            ?
            <TouchButton
              forIcon={true}
              onClick={() => dispatch(toggleMenuSide())}
              style={{ marginRight: '8px' }}>
              <OptionIcon />
            </TouchButton>
            : null
        }))
      ],
      { NavigationComponent: null, MenuSideButton: null }
    );

  return (
    <nav className={base}>
      <div className={iconBase}>
        <TouchButton onClick={() => dispatch(loadPath({ pathname: '/' }))}>
          <DJIcon style={{ width: 'inherit', height: 'inherit' }} />
        </TouchButton>
      </div>
      <div className={navBase}>
        <div className={reverseBase}>
          {render.NavigationComponent}
          {render.MenuSideButton}
        </div>
      </div>
    </nav>
  );
}
