import { of } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { loadPath } from '@/store/action';
import { HistoryAction, assertAllowedSearch } from '@/pages';

const onInitDoLoadPath = () =>
  () => of(location)
    .pipe(
      map((location): { pathname: string, historyAction: HistoryAction, search?: string } => ({ 
        pathname: location.pathname, 
        historyAction: 'replace',
        search: assertAllowedSearch(location.pathname, location.search) ? location.search : ''
      })),
      map(loadPath),
      first()
    );

export default onInitDoLoadPath;
