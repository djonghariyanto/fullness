import { MutableRefObject, FormEvent } from 'react';

import { fromEvent, merge } from 'rxjs';
import { tap } from 'rxjs/operators';

const preventDefaultOnEvent = (ref: MutableRefObject<HTMLElement>, ...types: string[]) =>
  () => {
    const sources$ = types.map(type => fromEvent<FormEvent<HTMLElement>>(ref.current, type));

    return merge(...sources$)
      .pipe(
        tap(e => e.preventDefault())
      );
  }

export default preventDefaultOnEvent;
