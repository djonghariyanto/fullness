import * as React from 'react';
import { default as _ } from './main.css';

import SearchIcon from '@/common/svgs/search';
import IconWrapper from '@/common/components/wrappers/icon';

const base = [
  _["input"],
  _["input--search"]
].join(' ');

const inputBase = _["input--search__input"];
const iconBase = _["input--search__icon"];

export default function Search(props: any) {
  return (
    <div className={base}>
      <label htmlFor="search-input" className={iconBase}>
        <IconWrapper>
          <SearchIcon />
        </IconWrapper>
      </label>
      <input id="search-input" className={inputBase} type="text">
      </input>
    </div>
  );
}
