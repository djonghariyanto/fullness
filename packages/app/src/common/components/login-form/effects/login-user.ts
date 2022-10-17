import { merge, of } from 'rxjs';
import { map, reduce, mergeAll, withLatestFrom, switchMap } from 'rxjs/operators';

import { Store, ofType } from '@/store';
import { LoginEntry } from '@/store/state';
import { loginUser, updateLoginEntry, throwValidationError, readyToSubmit } from '@/store/action';
import validateUsername from '@/common/validation/validate-username';
import validatePassword from '@/common/validation/validate-password';


const loginUserEffect = () =>
  ({ state, action }: Store) => {
    const entry$ = state.pipe(map(state => state.entry)),
      validateEntry = (entry: LoginEntry) => merge(
        of(validateUsername(entry.username.value)).pipe(map(username => ({ username }))),
        of(validatePassword(entry.password.value)).pipe(map(password => ({ password })))
      )
        .pipe(
          reduce((a, c) => ({ ...a, ...c }), <LoginEntry>new Object),
          map(({ username, password }) => ({
            hasErrorOccured: !username.isValidEntry || !password.isValidEntry,
            entry: <LoginEntry>{ username, password }
          }))
        );

    return action
      .pipe(
        ofType<void>(loginUser),
        withLatestFrom(entry$),
        switchMap(([, entry]) => validateEntry(entry)),
        map(validation => merge(of(updateLoginEntry(validation.entry)), of(validation.hasErrorOccured)
          .pipe(
            map(hasErrorOccured => hasErrorOccured
              ? throwValidationError()
              : readyToSubmit()
            ),
          )
        )),
        mergeAll()
      );
  }

export default loginUserEffect;
