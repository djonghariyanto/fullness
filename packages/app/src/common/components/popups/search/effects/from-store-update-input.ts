import { tap, filter, map, distinctUntilChanged, withLatestFrom } from 'rxjs';
import { Store } from '@/store';

const fromStoreUpdateInput = () =>
  ({ state }: Store) => {
    const input$ = state
      .pipe(
        map(state => state.searchPopup.inputRef)
      );

    return state
      .pipe(
        map(state => state.searchPopup),
        filter(search => search.shouldUpdate && search.result?.length > 0),
        map(search => search.result[search.index.curr]),
        distinctUntilChanged(),
        withLatestFrom(input$),
        tap(([ value, ref ]) => (<HTMLInputElement>ref).value = value)
      );
  }

export default fromStoreUpdateInput;
