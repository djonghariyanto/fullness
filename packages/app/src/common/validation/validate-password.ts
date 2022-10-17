import { passwordLengthPass } from './';
import { Entry } from '@/store/state';

export default function ValidatePassword(password: string): Required<Entry<string>> {
  const result = passwordLengthPass.assert(password);

  return {
    value: password,
    ...result
  }
}
