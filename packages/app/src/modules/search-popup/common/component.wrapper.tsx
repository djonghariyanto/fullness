import * as React from 'react';
import { default as _ } from '../main.css';
import { useStore } from '@/store';
import fromSearchPopupState from '@/common/renders/from-search-popup-state';
import onInitCalculatePosition from '../renders/on-init-calculate-position';
import onInputRefBlur from '../dispatches/on-input-ref-blur';

const base = _["search-popup"];
const hiddenBase = [
  base,
  _["search-popup--hidden"]
].join('');

export default function SearchPopupWrapper(props: { children?: React.ReactNode }) {
  const { useDispatchPipeline, useRenderPipeline } = useStore(),
    ref = React.useRef(null),

    render = useRenderPipeline<{ style?: React.CSSProperties, className?: string }>(
      [
        onInitCalculatePosition(ref),
        fromSearchPopupState(([activated, search]) => ({
          className: activated && search.result?.length > 0
            ? base
            : hiddenBase
        }))
      ],
      { style: null, className: base }
    );

  useDispatchPipeline(
    [
      onInputRefBlur()
    ]
  );

  return (
    <div ref={ref} className={render.className} style={render.style}>
      {props.children}
    </div>
  );
}
