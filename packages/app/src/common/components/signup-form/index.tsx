import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import { RegisterEntry } from '@/store/state';
import { registerUser, updateRegisterEntry } from '@/store/action';

import PrimaryTitle from '@/common/structures/titles/primary';
import StretchInputText from '../input-texts/stretch';
import PrimaryButton from '@/common/structures/btns/primary';
import ErrorMessage from '@/common/components/messages/error';
import preventDefaultOnSubmit from '@/common/events/prevent-default-onsubmit';
import resetErrorOnClick from '@/common/events/reset-error-onclick';
import selectError from '@/common/renders/select-error';
import registerUserEffect from './effects/register-user';
import initRegisterEntry from './dispatches/init-register-entry';

export interface Render {
  disabled: boolean,
  Username: React.ReactElement,
  Password: React.ReactElement
}

const base = _["signup-form"];

export default function SignupForm() {
  const { usePipeline, useRenderPipeline, useDispatchPipeline, dispatch } = useStore(),
    ref = React.useRef<HTMLFormElement>(null),

    render = useRenderPipeline<Render>(
      [
        selectError<RegisterEntry>(({ hasErrorOccured, entry }) => ({
          disabled: hasErrorOccured,
          Username: entry.username.isValidEntry || !hasErrorOccured
            ? null
            : <ErrorMessage style={{ position: 'absolute' }}>{entry.username.invalidMessage}</ErrorMessage>
        })),
        selectError<RegisterEntry>(({ hasErrorOccured, entry }) => ({
          disabled: hasErrorOccured,
          Password: entry.password.isValidEntry || !hasErrorOccured
            ? entry.rePassword?.isValidEntry || !hasErrorOccured
              ? null
              : <ErrorMessage style={{ position: 'absolute' }}>{entry.rePassword.invalidMessage}</ErrorMessage>
            : <ErrorMessage style={{ position: 'absolute' }}>{entry.password.invalidMessage}</ErrorMessage>
        }))
      ],
      { disabled: false, Username: null, Password: null }
    );

  usePipeline(
    preventDefaultOnSubmit(ref),
  );

  useDispatchPipeline(
    [
      initRegisterEntry(),
      registerUserEffect(),
      resetErrorOnClick()
    ]
  );

  return (
    <div className={base}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PrimaryTitle>
          Sign up
        </PrimaryTitle>
      </div>
      <div style={{ margin: '24px 0 0 0' }} />
      <form ref={ref} onSubmit={() => dispatch(registerUser())}>
        <StretchInputText
          name="register-username"
          type="text"
          spellCheck={false}
          autoCorrect="off"
          label="Enter username"
          onChange={(e) => dispatch(updateRegisterEntry({ username: { value: e.target.value } }))}
        />
        <div style={{ margin: '4px 0 42px 0', position: 'relative' }}>
          {render.Username}
        </div>
        <StretchInputText
          type="password"
          name="register-password"
          label="Enter password"
          spellCheck={false}
          autoCorrect="off"
          onChange={(e) => dispatch(updateRegisterEntry({ password: { value: e.target.value } }))}
        />
        <StretchInputText
          type="password"
          name="register-repassword"
          label="Re-enter password"
          spellCheck={false}
          autoCorrect="off"
          onChange={(e) => dispatch(updateRegisterEntry({ rePassword: { value: e.target.value } }))}
        />
        <div style={{ margin: '4px 0 42px 0', position: 'relative' }}>
          {render.Password}
        </div>
        <PrimaryButton disabled={render.disabled}>
          Submit
        </PrimaryButton>
      </form>
    </div>
  );
}
