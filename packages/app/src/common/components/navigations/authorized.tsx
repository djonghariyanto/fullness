import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import { activateMenuPopup } from '@/store/action';
import fromSessionState from '@/common/renders/from-session-state';
import fromMenuPopupState from '@/common/renders/from-menu-popup-state';
import IconButton from '@/common/components/buttons/icon';
import NavigationPopup from '@/common/components/popups/navigation';

const base = [_["navigation"], _["navigation--unauthorized"]].join(' ');

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
        })),
        fromMenuPopupState(([activated]) => ({
          toggled: activated
        }))
      ],
      { initial: null, toggled: false }
    ),
    Component = React.useMemo(() => <NavigationPopup />, []);

  return (
    <div className={base}>
      <IconButton
        toggled={render.toggled}
        onClick={(e) => dispatch(activateMenuPopup({ Component, byRef: e.currentTarget }))}
      >
        {render.initial}
      </IconButton>
    </div>
  );
}
