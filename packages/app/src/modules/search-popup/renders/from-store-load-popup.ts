import { skip, distinctUntilChanged, withLatestFrom, map } from 'rxjs';
import { Store } from '@/store';

const fromStoreLoadPopup = (Component: React.ReactElement) =>
  ({ state }: Store) => {
    const search$ = state
      .pipe(
        map(state => state.searchPopup)
      );

    return state
      .pipe(
        map(state => state.status.hasSearchPopupActivated),
        distinctUntilChanged(),
        withLatestFrom(search$),
        skip(1),
        map(([hasSearchPopupActivated, searchPopup]) => (render: any) => ({
          ...render,
          Content: hasSearchPopupActivated
            ? {
              ...Component,
              props: {
                ...Component.props,
                children: searchPopup.Component
              }
            }
            : null
        }))
      );
  }

export default fromStoreLoadPopup;
