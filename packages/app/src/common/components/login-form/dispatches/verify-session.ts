import { map, first, filter } from 'rxjs/operators';
import { Store } from '@/store';
import { commitPage } from '@/store/action';
import { Page, HistoryAction } from '@/pages';

const verifySession = () =>
  ({ state }: Store) => state
    .pipe(
      filter(state => state.status.authenticatedSession),
      map((): { page: Page, historyAction?: HistoryAction } => ({ page: 'Root', historyAction: 'replace' })),
      map(commitPage),
      first()
    );

export default verifySession;
