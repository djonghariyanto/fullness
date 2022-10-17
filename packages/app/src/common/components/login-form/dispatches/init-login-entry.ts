import { of } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { LoginEntry } from '@/store/state';
import { updateLoginEntry } from '@/store/action';

const initLoginEntry = () =>
  () => {
    const entry: LoginEntry = {
      username: { value: "" },
      password: { value: "" }
    };

    return of(entry).pipe(map(updateLoginEntry), first());
  }

export default initLoginEntry;
