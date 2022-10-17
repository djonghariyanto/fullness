import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadPath } from '@/store/action';
import { HistoryAction } from '@/pages';

const onPopstateDispatchLoadPath = () =>
  () => fromEvent(window, 'popstate')
    .pipe(
      map((e: PopStateEvent) => e.state),
      map((state): { pathname: string, historyAction?: HistoryAction, search?: string } => ({ 
        pathname: state.pathname, historyAction: 'replace', search: state.search 
      })),
      map(loadPath)
    );

export default onPopstateDispatchLoadPath;
