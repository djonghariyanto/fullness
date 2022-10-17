import { filter, map, first } from 'rxjs/operators';
import { Store } from '@/store';
import { commitPage } from '@/store/action';
import { Page, HistoryAction } from '@/pages';

const redirectRoot = () =>
  ({ state }: Store) => {

    return state
      .pipe(
        filter(state => !state.status.authenticatedSession),
        map((): { page: Page, historyAction: HistoryAction } => ({ page: 'Root', historyAction: 'replace' })),
        map(commitPage),
        first()
      );
  }

export default redirectRoot;
