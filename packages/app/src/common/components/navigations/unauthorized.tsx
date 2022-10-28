import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import { commitPage, loadPath } from '@/store/action';
import SecondaryButton from '@/common/structures/btns/secondary';
import SecondaryContainer from '@/common/structures/containers/secondary';
import SecondaryLabel from '@/common/structures/labels/secondary';
import fromSearchStateSwitchComponent from './renders/from-search-state-switch-component';

const base = [_["navigation"], _["navigation--unauthorized"]].join(' ');

export default function UnauthorizedNavigation() {
  const { useRenderPipeline, dispatch } = useStore(),
    render = useRenderPipeline(
      fromSearchStateSwitchComponent<{ Button: React.ReactElement }>(
        <SecondaryButton
          onClick={() => dispatch(loadPath({ pathname: '/login' }))}
        >
          <SecondaryContainer>
            <SecondaryLabel>
              login
            </SecondaryLabel>
          </SecondaryContainer>
        </SecondaryButton>,
        <SecondaryButton
          onClick={() => dispatch(commitPage({ page: 'Login', search: '?signup', historyAction: 'push' }))}
        >
          <SecondaryContainer>
            <SecondaryLabel>
              signup
            </SecondaryLabel>
          </SecondaryContainer>
        </SecondaryButton>
      ),
      { Button: null }
    );

  return (
    <div className={base}>
      {render.Button}
    </div>
  );
}
