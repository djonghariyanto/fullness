import { FilterItem, Filter } from '@/store/state';

export interface FilterStore {
  dates: FilterItem[],
  categories: FilterItem []
}

export const initialState: Filter = {
  dates: [],
  categories: [],
  matchAll: false
}

