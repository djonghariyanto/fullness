import * as React from 'react';
import { default as _ } from './main.css';
import { categoryList } from './';

import { useStore, Action } from '@/store';
import { FilterItem } from '@/store/state';
import FlatButton from '@/common/structures/buttons/flat';

const base = [
  _["category"],
].join(' ');

export default function DefaultCategory(props: { onToggle: (category: FilterItem) => Action<any> }) {
  const { dispatch } = useStore();

  return (
    <div className={base}>
      {categoryList.map((category, key) =>
        <FlatButton
          key={key}
          onClick={() => dispatch(props.onToggle(({ id: category, display: category })))}
        >
          {category}
        </FlatButton>)
      }
    </div>
  );
}

