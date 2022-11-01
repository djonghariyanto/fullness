import { distinctUntilKeyChanged, switchMap, map } from 'rxjs';
import { Store } from '@/store';
import { isMenuSideAccessible } from '@/pages';

const fromPageMenuSideOption = (Component: React.ReactElement) =>
  ({ state }: Store) => {
    const status$ = state
      .pipe(
        map(state => state.status),
        distinctUntilKeyChanged('hasMenuSideActivated')
      );

    return state
      .pipe(
        map(state => state.status),
        distinctUntilKeyChanged('currentPage'),
        switchMap(() => status$),
        map(status => isMenuSideAccessible(status.currentPage) && status.hasMenuSideActivated),
        map(activated => (render: any) => ({
          ...render,
          MenuSide: activated ? Component : null
        }))
      );
  }

export default fromPageMenuSideOption;
