import React, { useRef } from 'react';
import Sidebar from './Sidebar';
import Main from './Main';
import Header from './Header';
import Toasts from './Toasts';

const Layout = ({ children }) => {
  const sidebarRef = useRef(null);

  return (
    <div className="flex w-screen h-screen">
      <Toasts />
      <Sidebar sidebarRef={sidebarRef} />
      <div className="flex flex-col w-full h-full">
        <Header sidebarRef={sidebarRef} />
        <Main>{children}</Main>
      </div>
    </div>
  );
};

export default Layout;
