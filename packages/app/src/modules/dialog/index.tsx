import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import { closeDialog } from '@/store/action';
import loadDialog from './renders/load-dialog';

export interface Render {
  Content: null
}

const base = _["dialog"];
const contentBase = _["dialog__content"];
const closeBase = _["dialog__content__close"];

export function DialogWrapper(props: { withClose?: boolean, children: React.ReactElement }) {
  const { withClose, children } = Object.assign({}, { withClose: true }, props),
    { dispatch } = useStore();

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
