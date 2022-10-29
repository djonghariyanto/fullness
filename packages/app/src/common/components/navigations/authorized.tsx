import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import { activateMenuPopup } from '@/store/action';
import fromSessionState from '@/common/renders/from-session-state';
import fromMenuPopupState from '@/common/renders/from-menu-popup-state';
import PrimaryButton from '@/common/structures/buttons/primary';
import PrimaryIconWrapper from '@/common/structures/wrappers/primary-icon';
import BindBehavior from '@/common/components/binds/behavior';
import NavigationPopup from '@/common/components/popups/navigation';

const base = [_["navigation"], _["navigation--authorized"]].join(' ');

interface Render {
  initial?: string,
  toggled?: boolean
}

export default function AuthorizedNavigation() {
  const { useRenderPipeline, dispatch } = useStore(),
    render = useRenderPipeline<Render>(
      [
        fromSessionState(([, session]) => ({
          initial: session.username.toUpperCase()[0]
        }))
      ],
      { initial: null }
    ),
    Component = React.useMemo(() => <NavigationPopup />, []);

  return (
    <div className={base}>
      <PrimaryIconWrapper>
        <BindBehavior 
          onObserve={fromMenuPopupState(([ selected ]) => ({ selected }))}
        >
          <PrimaryButton
            onClick={(e) => dispatch(activateMenuPopup({ Component, byRef: e.currentTarget }))}
          >
            {render.initial}
          </PrimaryButton>
        </BindBehavior>
      </PrimaryIconWrapper>
    </div>
  );
}
