import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import { subStore } from '@/store/action';
import { toggleCategory } from '@/common/components/filter-group/store/action';
import BindBehavior from '@/common/components/binds/behavior';
import FlatButton from '@/common/structures/buttons/flat';
import ofSubStoreToggleCategory from './renders/of-sub-store-toggle-category';
import onInit from './renders/on-init';

const base = [
  _["category"]
].join(' ');

export default function DefaultCategory() {
  const { useRenderPipeline, dispatch } = useStore(),
    render = useRenderPipeline(
      onInit(),
      { categories: [] }
    );

  return (
    <div className={base}>
      {render.categories?.map((category: { id: string, selected: boolean }, key: number) =>
        <BindBehavior
          key={key}
          selected={category.selected}
          onObserve={ofSubStoreToggleCategory(key)}
        >
          <FlatButton
            onClick={() => dispatch(subStore({
              type: toggleCategory,
              payload: { index: key, id: category.id, display: category.id }
            }))}
          >
            {category.id}
          </FlatButton>
        </BindBehavior>)
      }
    </div>
  );
}

