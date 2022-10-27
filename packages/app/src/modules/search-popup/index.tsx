import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import fromStoreLoadPopup from './renders/from-store-load-popup';
import SearchPopupWrapper from './common/component.wrapper';
import calculatePosition from './common/util.calculate-position';

export interface Render {
  Content: React.ReactElement
}

export { calculatePosition }

export default function SearchPopup() {
  const { useRenderPipeline } = useStore(),
    render = useRenderPipeline(
      fromStoreLoadPopup(<SearchPopupWrapper />),
      { Content: null }
    );

  return render.Content;
}
