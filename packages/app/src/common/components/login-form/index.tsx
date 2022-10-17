import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import { loginUser, updateLoginEntry } from '@/store/action';

import StretchInputText from '../input-texts/stretch';
import RoundedButton from '../buttons/rounded';
import loginUserEffect from './effects/login-user';
import initLoginEntry from './dispatches/init-login-entry';
import applyError from './renders/apply-error';
import preventDefaultOnSubmit from '@/common/events/prevent-default-onsubmit';
import resetErrorOnClick from '@/common/events/reset-error-onclick';
import submitEntry from './events/submit-entry';
import verifySession from './dispatches/verify-session';
import selectError from '@/common/renders/select-error';
import ExtraSmallTitle from '@/common/components/titles/extra-small';

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
        <ExtraSmallTitle weight="medium">
          Signin user
        </ExtraSmallTitle>
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
        <RoundedButton disabled={render.disabled}>
          Submit
        </RoundedButton>
      </form>
    </div>
  );
}
