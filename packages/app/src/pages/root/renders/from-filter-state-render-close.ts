import { map, distinctUntilKeyChanged } from 'rxjs';
import { Store } from '@/store';

const fromFilterStateRenderClose = (Component: React.ReactElement) =>
  ({ state }: Store) => {
    return state 
      .pipe(
        map(state => state.status),
        distinctUntilKeyChanged('isFilterUsed'),
        map(status => (render: { Close: React.ReactElement}) => ({
          ...render, 
          Close: status.isFilterUsed ? Component : null
        })),
      );
  }

export default fromFilterStateRenderClose;
