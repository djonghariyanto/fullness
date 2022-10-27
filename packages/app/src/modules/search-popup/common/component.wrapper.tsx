import * as React from 'react';
import { default as _ } from '../main.css';
import { useStore } from '@/store';
import onInitCalculatePosition from '../renders/on-init-calculate-position';
import onInputRefBlur from '../dispatches/on-input-ref-blur';

const base = _["search-popup"];

export default function SearchPopupWrapper(props: { children?: React.ReactNode }) {
  const { useDispatchPipeline, useRenderPipeline } = useStore(),
    ref = React.useRef(null),

    render = useRenderPipeline(
      [
        onInitCalculatePosition(ref)
      ],
      { style: null }
    );

  useDispatchPipeline(
    [
      onInputRefBlur()
    ]
  );

  return (
    <div ref={ref} className={base} style={render.style}>
      {props.children}
    </div>
  );
}
