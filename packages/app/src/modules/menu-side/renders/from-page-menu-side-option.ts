import { distinctUntilKeyChanged, map } from 'rxjs';
import { Store } from '@/store';
import { isMenuSideAccessible } from '@/pages';

const fromPageMenuSideOption = (Component: React.ReactElement) =>
  ({ state }: Store) => {
    return state
      .pipe(
        map(state => state.status),
        distinctUntilKeyChanged('currentPage'),
        map(status => isMenuSideAccessible(status.currentPage)),
        map(activated => (render: any) => ({
          ...render,
          MenuSide: activated ? Component : null
        }))
      );
  }

export default fromPageMenuSideOption;
