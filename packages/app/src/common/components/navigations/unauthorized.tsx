import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import { commitPage, loadPath } from '@/store/action';
import WarningButton from '@/common/components/buttons/warning';
import fromSearchStateSwitchComponent from './renders/from-search-state-switch-component';

const base = [_["navigation"], _["navigation--unauthorized"]].join(' ');

export default function UnauthorizedNavigation() {
  const { useRenderPipeline, dispatch } = useStore(),
    render = useRenderPipeline(
      fromSearchStateSwitchComponent<{ Button: React.ReactElement }>(
        <WarningButton onClick={() => dispatch(loadPath({ pathname: '/login' }))}>
          login
        </WarningButton>,
        <WarningButton onClick={() => dispatch(commitPage({ page: 'Login', search: '?signup', historyAction: 'push' }))}>
          signup
        </WarningButton>
      ),
      { Button: null }
    );

  return (
    <div className={base}>
      {render.Button}
    </div>
  );
}
