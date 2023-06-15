import React, { useRef } from 'react';
import Sidebar from './Sidebar';
import Main from './Main';
import Header from './Header';
import Toasts from './Toasts';
import TaskDetailDrawer from './TaskDetailDrawer';

const Layout = ({ children }) => {
  const sidebarRef = useRef(null);

  return (
    <div className="flex w-screen h-screen">
      <TaskDetailDrawer />
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
