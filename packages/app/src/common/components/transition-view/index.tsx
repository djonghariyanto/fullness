import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import onInit from './renders/on-init';
import ofViewTransitionChangeStyle from './renders/of-view-transition-change-style';
import onIntersectDoResetPosition from './renders/on-intersect-do-reset-position';
import onIntersectSetTransitionViewIndex from './dispatches/on-intersect-set-transition-view-index';
import TransitionViewWrapper from './common/component.wrapper';

interface Props {
  id: string,
  children: React.ReactElement[],
  observe?: boolean
}

const base = _["transition-view"];
const animateBase = [base, _["transition-view--animate"]].join(' ');
export { base, animateBase }

export { TransitionViewWrapper }

export default function TransitionView(props: Props) {
  const { useRenderPipeline, useDispatchPipeline } = useStore(),
    { observe } = Object.assign({}, { observe: false }, props),
    childStyle = { width: `calc( 100% / ${props.children.length + 2})` },
    ref = React.useRef(null),
    firstRef = React.useRef(null),
    lastRef = React.useRef(null),

    length = props.children.length,

    render = useRenderPipeline(
      [
        onInit(ref, length, observe),
        ofViewTransitionChangeStyle(ref, props.id),
        onIntersectDoResetPosition(firstRef, length),
        onIntersectDoResetPosition(lastRef, 1)
      ],
      { className: base, style: null, childStyle: null, index: 1 }
    );

  useDispatchPipeline(
    [
      onIntersectSetTransitionViewIndex(firstRef, props.id, length),
      onIntersectSetTransitionViewIndex(lastRef, props.id, 1)
    ]
  );

  return (
    <div ref={ref} className={render.className} style={render.style}>
      <div ref={firstRef} style={childStyle}>
        {props.children[length - 1]}
      </div>
      {props.children.map((element, key) =>
        <div key={key} style={childStyle}>
          {element}
        </div>
      )}
      <div ref={lastRef} style={childStyle}>
        {props.children[0]}
      </div>
    </div>
  );
}
