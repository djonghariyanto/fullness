import * as React from 'react';
import { default as _ } from '../main.css';

import LoginForm from '@/common/components/login-form'
import OptionMessage from '@/common/components/messages/option';
import preventDefaultOnEvent from '@/common/events/prevent-default-onevent';
import loadSearchEffect from './effects/load-search'; import closeDialogEffect from './effects/close-dialog';
import DJIcon from '@/common/svgs/dj-icon';
import { commitPage } from '@/store/action';
import { useStore } from '@/store';
import { Props } from '../';

export interface ComponentState {
  AuthenticationError: React.ReactElement,
}

const base = _["login"];
const contentBase = _["login__content"];

export default function Login(props: Props) {
  const { usePipeline, useDispatchPipeline, dispatch } = useStore(),
    ref = React.useRef(null);

  usePipeline(
    preventDefaultOnEvent(ref, 'click', 'mousedown', 'pointerdown')
  );

  useDispatchPipeline(
    [
      loadSearchEffect(),
      closeDialogEffect()
    ]
  );

  return (
    <div className={base}>
      <div className={contentBase}>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <DJIcon style={{ width: '36px', height: '36px', position: 'absolute', top: '-36px' }} />
        </div>
        <div style={{ marginTop: '28px' }} />
        <LoginForm />
        <div style={{ marginTop: '28px' }} />
        <OptionMessage>
          <a
            ref={ref}
            href="/login?signup"
            onClick={() => dispatch(commitPage({ page: 'Login', search: '?signup', historyAction: 'push' }))}
          >
            Signup
          </a>
          <span>&nbsp;here if you don't have account</span>
        </OptionMessage>
      </div>
    </div>
  );
}
