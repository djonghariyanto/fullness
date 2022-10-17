import * as React from 'react';
import { map, distinctUntilKeyChanged, filter } from 'rxjs/operators';
import { Store } from '@/store';
import { Render } from '../';
import NotFound from '@/pages/not-found';

const fromPageStateRenderCurrentPage = (pages: React.ReactElement[]) =>
  ({ state }: Store) => state
    .pipe(
      map(state => state.status),
      filter(status => !status.loading),
      distinctUntilKeyChanged('currentPage'),
      map(status => pages.find(reactElement => reactElement.props.page === status.currentPage)),
      map(reactElement => (render: Render): Render => ({
        ...render,
        CurrentPage: reactElement?reactElement:<NotFound />  
      }))
    );

export default fromPageStateRenderCurrentPage;
