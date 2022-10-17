import * as React from 'react';

import { useStore } from '@/store';
import { Props } from '../';
import signoutUser from './dispatches/signout-user';
import redirectRoot from './dispatches/redirect-root';

export default function Logout(props: Props) {
  const { useDispatchPipeline } = useStore();

  useDispatchPipeline(
    [
      signoutUser(),
      redirectRoot()
    ]
  );

  return <></>;
}
