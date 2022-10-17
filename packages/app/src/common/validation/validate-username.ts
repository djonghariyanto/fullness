import { usernameLengthPass } from './';
import { Entry } from '@/store/state';

export default function ValidateUsername(username: string): Required<Entry<string>> {
  const result = usernameLengthPass.assert(username);

  return {
    value: username,
    ...result
  }
}
