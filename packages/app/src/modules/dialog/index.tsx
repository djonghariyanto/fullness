import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import { closeDialog } from '@/store/action';
import loadDialog from './renders/load-dialog';
import onKeypress from '@/common/dispatches/on-keypress';
import keyHandler, { defaultedKeys } from './common/util.key-handler';

export interface Render {
  Content: null
}

const base = _["dialog"];
const contentBase = _["dialog__content"];
const closeBase = _["dialog__content__close"];

export function DialogWrapper(props: { withClose?: boolean, children: React.ReactElement }) {
  const { withClose, children } = Object.assign({}, { withClose: true }, props),
    { useDispatchPipeline, dispatch } = useStore();

  useDispatchPipeline(
    onKeypress(keyHandler, defaultedKeys)
  );

  return (
    <div className={base}>
      <div className={contentBase}>
        {
          withClose
          &&
          <button className={closeBase} onClick={() => dispatch(closeDialog({ withConfirmation: false }))}>
            X
          </button>
        }
        {children}
      </div>
    </div>
  );
}

export default function Dialog() {
  const { useRenderPipeline } = useStore(),
    render = useRenderPipeline(loadDialog(), { Content: null });

  return render.Content;
}
