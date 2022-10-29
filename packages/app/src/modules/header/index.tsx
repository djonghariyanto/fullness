import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import { loadPath } from '@/store/action';

import { toggleMenuSide } from '@/store/action';
import fromPageMenuSideOption from '@/common/renders/from-page-menu-side-option';
import fromSessionState from '@/common/renders/from-session-state';
import AuthorizedNavigation from '@/common/components/navigations/authorized';
import UnauthorizedNavigation from '@/common/components/navigations/unauthorized';
import BindBehavior from '@/common/components/binds/behavior';
import FlatButton from '@/common/structures/buttons/flat';
import SecondaryContainer from '@/common/structures/containers/secondary';
import PrimaryIconWrapper from '@/common/structures/wrappers/primary-icon';
import SecondaryIconWrapper from '@/common/structures/wrappers/secondary-icon';
import Icon from '@/common/structures/wrappers/common/component.icon';
import DJIcon from '@/common/svgs/dj-icon';
import OptionIcon from '@/common/svgs/option';
import fromSideMenuToggleIcon from './renders/from-side-menu-toggle-icon';

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
        fromPageMenuSideOption(([ isAccesible ]) => ({
          MenuSideButton: isAccesible
            ?
            <BindBehavior onObserve={fromSideMenuToggleIcon()}>
              <FlatButton onClick={() => dispatch(toggleMenuSide())}>
                <BindBehavior onObserve={fromSideMenuToggleIcon()}>
                  <SecondaryIconWrapper>
                    <Icon>
                      <OptionIcon />
                    </Icon>
                  </SecondaryIconWrapper>
                </BindBehavior>
              </FlatButton>
            </BindBehavior>
            : null
        }))
      ],
      { NavigationComponent: null, MenuSideButton: null }
    );

  return (
    <nav className={base}>
      <div className={iconBase}>
        <PrimaryIconWrapper>
          <FlatButton
            onClick={() => dispatch(loadPath({ pathname: '/' }))}
          >
            <DJIcon/>
          </FlatButton>
        </PrimaryIconWrapper>
      </div>
      <div className={navBase}>
        <div className={reverseBase}>
          {render.NavigationComponent}
          <SecondaryContainer>
            {render.MenuSideButton}
          </SecondaryContainer>
        </div>
      </div>
    </nav>
  );
}
