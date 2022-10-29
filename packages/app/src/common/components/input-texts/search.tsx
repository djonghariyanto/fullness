import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import { activateSearchPopup, fetchSearchTerm } from '@/store/action';
import SearchIcon from '@/common/svgs/search';
import PrimaryIconWrapper from '@/common/structures/wrappers/primary-icon';
import Icon from '@/common/structures/wrappers/common/component.icon';
import SearchResultPopup from '@/common/components/popups/search';
import onElementKeypress from '@/common/dispatches/on-element-keypress';
import keySearchReducer from './common/util.key-search-reducer';

const commitValue = '[Search Input] commit value';

const base = [
  _["input"],
  _["input--search"]
].join(' ');

const inputBase = _["input--search__input"];
const iconBase = _["input--search__icon"];

export { commitValue };

export default function Search(props: { onGenerate?: Generator<number> }) {
  const { useDispatchPipeline, dispatch } = useStore(),
    { onGenerate }: { onGenerate: Generator<number> } = Object.assign({}, { onGenerate: null }, props),

    index: number = onGenerate !== null ? onGenerate.next().value : 0,
    ref = React.useRef(null),
    inputRef = React.useRef(null);

  useDispatchPipeline(
    onElementKeypress(inputRef, keySearchReducer)
  );

  return (
    <div ref={ref} className={base}>
      <label htmlFor={`search-input${index}`} className={iconBase}>
        <PrimaryIconWrapper>
          <Icon>
            <SearchIcon />
          </Icon>
        </PrimaryIconWrapper>
      </label>
      <input
        ref={inputRef}
        id={`search-input${index}`}
        className={inputBase}
        type="text"
        autoComplete="off"
        onFocus={() => dispatch(activateSearchPopup({
          Component: <SearchResultPopup />,
          byRef: ref.current,
          inputRef: inputRef.current
        }))}
        onChange={() => dispatch(fetchSearchTerm())}
      />
    </div>
  );
}
