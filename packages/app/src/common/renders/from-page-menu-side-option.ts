import { distinctUntilKeyChanged, map } from 'rxjs';
import { Store } from '@/store';
import { isMenuSideAccessible } from '@/pages';

const fromPageMenuSideOption = (fn: any) =>
  ({ state }: Store) => {
    return state
      .pipe(
        map(state => state.status),
        distinctUntilKeyChanged('currentPage'),
        map(status => [isMenuSideAccessible(status.currentPage), status.hasMenuSideActivated]),
        map(([accesible, activated]) => (render: any) => ({
          ...render,
          ...fn([accesible, activated])
        }))
      );
  }

export default fromPageMenuSideOption;
