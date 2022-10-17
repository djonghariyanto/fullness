import { map, first, tap, filter, distinctUntilKeyChanged } from 'rxjs';
import { Store } from '@/store';

const fromStateGetFilters = () =>
  ({ state }: Store) => {
    return state
      .pipe(
        distinctUntilKeyChanged('events'),
        filter(state => state.status.isFilterUsed),
        map(state => state.filters[state.status.searchFilterIndex]),
        map(filter => [...filter.dates.map(date => date.display), ...filter.categories.map(cat => cat.display)]),
        map(filters => render => ({
          ...render,
          filters: filters
        }))
      );
  }

export default fromStateGetFilters;
