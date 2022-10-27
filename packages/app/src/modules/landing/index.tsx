import * as React from 'react';

import { useStore } from '@/store';
import Header from '@/modules/header';
import Content from '@/modules/content';
import Dialog from '@/modules/dialog';
import SearchPopup from '@/modules/search-popup';
import MenuPopup from '@/modules/menu-popup';
import MenuSide from '@/modules/menu-side';

import Root from '@/pages/root';
import Create from '@/pages/create';
import Login from '@/pages/login';
import Logout from '@/pages/logout';
import ContentLoading from '@/common/components/loadings/content';

import onInitDoLoadPath from './dispatches/on-init-do-load-path';

export default function Landing(): React.ReactElement {
  const { useDispatchPipeline } = useStore();

  useDispatchPipeline(
    onInitDoLoadPath()
  );

  return (
    <>
      <Header />
      <MenuSide />
      <Content>
        <Root page={ "Root" } pathname={ "/" } />
        <Create page={ "Create" } pathname={ "/create" } />
        <Login page={ "Login" } pathname={ "/login" } />
        <Logout page={ "Logout" } pathname={ "/logout" } />
      </Content>
      <Dialog />
      <SearchPopup />
      <MenuPopup />
      <ContentLoading />
    </>
  );
}

