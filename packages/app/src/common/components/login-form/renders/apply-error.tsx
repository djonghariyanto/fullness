import * as React from 'react';

import { map, distinctUntilKeyChanged } from 'rxjs/operators';
import { Store } from '@/store';
import { Render } from '../';
import ErrorMessage from '@/common/components/messages/error';

const applyError = () =>
  ({ state }: Store) => {
    return state
      .pipe(
        distinctUntilKeyChanged('status'),
        map(({ error, status }) => (render: Render) => ({
          ...render,
          AuthenticationError:
            status.hasErrorOccured
              && (error.type === "authentication" || error.type === "validation")
              ? <ErrorMessage>Incorrect username and password</ErrorMessage>
              : null
        }))
      );
  }

export default applyError;
