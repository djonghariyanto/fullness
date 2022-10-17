import { of } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { RegisterEntry } from '@/store/state';
import { updateRegisterEntry } from '@/store/action';

const initRegisterEntry = () =>
  () => {
    const entry: RegisterEntry = {
      username: { value: "" },
      password: { value: "" },
      rePassword: { value: "" }
    };

    return of(entry).pipe(map(updateRegisterEntry), first());
  }

export default initRegisterEntry;
