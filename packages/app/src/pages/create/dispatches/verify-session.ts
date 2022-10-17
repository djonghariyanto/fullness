import { filter } from 'rxjs/operators';

import { Store } from '@/store';

const verifySession = () =>
  ({ state }: Store) => state
    .pipe(
      filter(state => !state.status.authenticatedSession),

      );

export default verifySession;
