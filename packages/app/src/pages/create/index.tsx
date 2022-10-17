import * as React from 'react';
import { default as _ } from './main.css';

import { useStore } from '@/store';
import { Props } from '../';
import verifySession from './dispatches/verify-session';

const base = _["create"];

export default function Create(props: Props) {
  const { usePipeline } = useStore();

  usePipeline(
    verifySession()
  );

  return (
    <div className={base}>
      You have reached Create
    </div>
  )
}
