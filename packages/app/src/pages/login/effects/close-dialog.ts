import { asyncScheduler } from 'rxjs';
import { map, observeOn } from 'rxjs/operators';
import { Store, ofType } from '@/store';
import { commitPage, closeDialog } from '@/store/action';
import { Page, HistoryAction } from '@/pages';

type CloseDialog = Parameters<typeof closeDialog>[0];

const closeDialogEffect = () =>
  ({ action }: Store) => action
    .pipe(
      observeOn(asyncScheduler),
      ofType<CloseDialog>(closeDialog),
      map((): { page: Page, historyAction?: HistoryAction, search?: string } => ({ 
        page: "Login",
        search: "",
        historyAction: 'push'
      })),
      map(commitPage)
    );

export default closeDialogEffect;

