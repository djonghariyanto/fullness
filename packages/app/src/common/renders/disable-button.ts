import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import { Store } from '@/store';

const disableButton: <T>(callback: (authenticated: boolean) => Partial<T>) => (store: Store) => Observable<(render: T) => any> = (callback) =>
  ({ state }: Store) => state
    .pipe(
      map(state => state.status.authenticatedSession),
      distinctUntilChanged(),
      map(authenticated => (render: any) => ({
        ...render,
        ...callback(authenticated)
      }))
    );


export default disableButton;

