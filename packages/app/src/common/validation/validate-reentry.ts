import { reEntryPass } from './';
import { Entry } from '@/store/state';

export default function ValidateReentry(entry: string, testEntry: string): Required<Entry<string>> {
  const result = reEntryPass.test(entry, testEntry);

  return {
    value: entry,
    ...result
  }
}
