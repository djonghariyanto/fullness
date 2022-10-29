import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import { loginUser, updateLoginEntry } from '@/store/action';

import StretchInputText from '../input-texts/stretch';
import PrimaryButton from '@/common/structures/buttons/primary';
import loginUserEffect from './effects/login-user';
import initLoginEntry from './dispatches/init-login-entry';
import applyError from './renders/apply-error';
import preventDefaultOnSubmit from '@/common/events/prevent-default-onsubmit';
import resetErrorOnClick from '@/common/events/reset-error-onclick';
import submitEntry from './events/submit-entry';
import verifySession from './dispatches/verify-session';
import selectError from '@/common/renders/select-error';
import PrimaryTitle from '@/common/structures/titles/primary';

export interface Render {
  disabled: boolean,
  AuthenticationError: React.ReactElement
}

const base = _["login-form"];
const baseMessage = _["login-form__message"];

export default function LoginForm() {
  const { usePipeline, useRenderPipeline, useDispatchPipeline, dispatch } = useStore(),
    ref = React.useRef<HTMLFormElement>(null),

    render = useRenderPipeline(
      [
        applyError(),
        selectError(({ hasErrorOccured }) => ({ disabled: hasErrorOccured }))
      ],
      { disabled: false, AuthenticationError: null }
    );

  usePipeline(
    [
      preventDefaultOnSubmit(ref)
    ]
  );

  useDispatchPipeline(
    [
      initLoginEntry(),
      verifySession(),
      submitEntry(),
      loginUserEffect(),
      resetErrorOnClick()
    ]
  );

  return (
    <div className={base}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PrimaryTitle>
          Signin user
        </PrimaryTitle>
      </div>
      <div style={{ margin: '24px 0 0 0' }} />
      <form ref={ref} onSubmit={() => dispatch(loginUser())}>
        <StretchInputText
          name="username"
          type="text"
          spellCheck={false}
          autoCorrect="off"
          label="Enter username"
          onChange={(e) => dispatch(updateLoginEntry({ username: { value: e.target.value } }))}
        />
        <div style={{ margin: '4px 0 0 0' }} />
        <StretchInputText
          type="password"
          name="password"
          label="Enter password"
          spellCheck={false}
          autoCorrect="off"
          onChange={(e) => dispatch(updateLoginEntry({ password: { value: e.target.value } }))}
        />
        <div className={baseMessage}>
          {render.AuthenticationError}
        </div>
        <div style={{ margin: '16px 0 0 0' }} />
        <PrimaryButton disabled={render.disabled}>
          Submit
        </PrimaryButton>
      </form>
    </div>
  );
}
