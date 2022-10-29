import * as React from 'react';
import { default as _ } from '../main.css';
import Style from '@/common/css';

import { useStore, Store } from '@/store';
import { loadPath } from '@/store/action';
import SignoutIcon from '@/common/svgs/signout';
import PrimaryLabel from '@/common/structures/labels/primary';
import SecondaryLabel from '@/common/structures/labels/secondary';
import FlatButton from '@/common/structures/buttons/flat';
import Inline from '@/common/structures/inline';
import SecondaryWrapper from '@/common/structures/wrappers/secondary';
import PrimaryIconWrapper from '@/common/structures/wrappers/primary-icon';
import SecondaryIconWrapper from '@/common/structures/wrappers/secondary-icon';
import Icon from '@/common/structures/wrappers/common/component.icon';
import PrimaryContainer from '@/common/structures/containers/primary';
import SecondaryContainer from '@/common/structures/containers/secondary';

import { distinctUntilKeyChanged, map } from 'rxjs/operators';

const base = [_["popup"], _["popup--navigation"]].join(' ');
const headerBase = [_["popup__header"], Style["--size-lg"], Style["--weight-bold"]].join(' ');
const dividerBase = _["popup__divider"];
const contentBase = _["popup__content"];

export default function NavigationPopup() {
  const { useRenderPipeline, dispatch } = useStore(),
    ref = React.useRef(null),

    render = useRenderPipeline(
      ({ state }: Store) => state
        .pipe(
          distinctUntilKeyChanged('session'),
          map(state => state.session.username),
          map(username => (render: { username: string }) => ({
            ...render,
            username
          }))
        ),
      { username: null }
    );

  return (
    <div ref={ref} className={base}>
      <div className={headerBase}>
        <Inline>
          <SecondaryWrapper>
            <SecondaryIconWrapper>
              {render.username?.toUpperCase()[0]}
            </SecondaryIconWrapper>
          </SecondaryWrapper>
          <SecondaryContainer>
            <PrimaryLabel>
              {render.username}
            </PrimaryLabel>
          </SecondaryContainer>
        </Inline>
      </div>
      <div className={dividerBase} />
      <div className={contentBase}>
        <FlatButton
          onClickCapture={() => dispatch(loadPath({ pathname: '/create' }))}
        >
          <PrimaryContainer>
            <Inline>
              <PrimaryIconWrapper>
                <Icon>
                  <SignoutIcon />
                </Icon>
              </PrimaryIconWrapper>
              <SecondaryContainer>
                <SecondaryLabel>
                  Create new event
                </SecondaryLabel>
              </SecondaryContainer>
            </Inline>
          </PrimaryContainer>
        </FlatButton>
        <FlatButton
          onClickCapture={() => dispatch(loadPath({ pathname: '/logout' }))}
        >
          <PrimaryContainer>
            <Inline>
              <PrimaryIconWrapper>
                <Icon>
                  <SignoutIcon />
                </Icon>
              </PrimaryIconWrapper>
              <SecondaryContainer>
                <SecondaryLabel>
                  Sign out
                </SecondaryLabel>
              </SecondaryContainer>
            </Inline>
          </PrimaryContainer>
        </FlatButton>
      </div>
    </div>
  );
}
