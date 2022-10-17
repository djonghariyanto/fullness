import * as React from 'react';

import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';

const preventDefault = (ref: React.MutableRefObject<HTMLFormElement>, type: string) =>
  () => fromEvent<React.FormEvent<HTMLFormElement>>(ref.current, type)
    .pipe(
      tap(e => e.preventDefault())
    );

export default preventDefault;
