import { merge, of } from 'rxjs';
import { map, reduce, mergeAll, withLatestFrom, switchMap } from 'rxjs/operators';

import { Store, ofType } from '@/store';
import { RegisterEntry } from '@/store/state';
import { registerUser, updateRegisterEntry, throwValidationError, readyToSubmit } from '@/store/action';
import validateUsername from '@/common/validation/validate-username';
import validatePassword from '@/common/validation/validate-password';
import validateReentry from '@/common/validation/validate-reentry';

const registerUserEffect = () =>
  ({ state, action }: Store) => {
    const entry$ = state.pipe(map(state => state.entry)),
      validateEntry = (entry: RegisterEntry) => merge(
        of(validateUsername(entry.username.value)).pipe(map(username => ({ username }))),
        of(validatePassword(entry.password.value)).pipe(map(password => ({ password }))),
        of(validateReentry(entry.rePassword.value, entry.password.value)).pipe(map(rePassword => ({ rePassword })))
      )
        .pipe(
          reduce((a, c) => ({ ...a, ...c }), <RegisterEntry>new Object),
          map(({ username, password, rePassword }) => ({
            hasErrorOccured: !username.isValidEntry || !password.isValidEntry || !rePassword.isValidEntry,
            entry: <RegisterEntry>{ username, password, rePassword }
          }))
        );

    return action
      .pipe(
        ofType<void>(registerUser),
        withLatestFrom(entry$),
        switchMap(([, entry]: [void, RegisterEntry]) => validateEntry(entry)),
        map(validation => merge(of(updateRegisterEntry(validation.entry)), of(validation.hasErrorOccured)
          .pipe(map(hasErrorOccured => hasErrorOccured ? throwValidationError() : readyToSubmit()))
        )),
        mergeAll()
      );
  }

export default registerUserEffect;
