import { map, distinctUntilChanged } from 'rxjs';
import { Store } from '@/store';

const fromSideMenuToggleIcon = () =>
  ({ state }: Store) => {
    return state
      .pipe(
        map(state => state.status.hasMenuSideActivated),
        distinctUntilChanged(),
        map(selected => (render: { selected: boolean }) => ({
          ...render, selected
        }))
      );
  }

export default fromSideMenuToggleIcon;
