import { map, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';
import { Store } from '@/store';

const selectError: <T>(fn: (params: { hasErrorOccured: boolean, entry: T }) => any) => any = (fn) =>
  ({ state }: Store) => {
    const entry$ = state
      .pipe(
        map(state => state.entry)
      );

    return state
      .pipe(
        map(state => state.status.hasErrorOccured),
        distinctUntilChanged(),
        withLatestFrom(entry$),
        map(([ hasErrorOccured, entry ]: [hasErrorOccured: boolean, entry: any]) => (render: any) => ({
          ...render,
          ...fn({ hasErrorOccured, entry })
        }))
      );
  }

export default selectError;
