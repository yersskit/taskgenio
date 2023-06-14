import React, { useEffect } from 'react';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import HamburgerMenu from './HamburgerMenu';
import { useSelector, useDispatch } from 'react-redux';
import { useCurrentWidth } from '../../hooks/useCurrentWidth';
import { handleCloseSidebar, handleOpenSidebar } from '../../store/layout';
import UserDropdown from './UserDropdown';

const Header = ({ sidebarRef }) => {
  const dispatch = useDispatch();
  let width = useCurrentWidth();

  useEffect(() => {
    let sessionHideSidebar = sessionStorage.getItem('sidebarHidden');

    if (width > 768 && sidebarRef.current && !sessionHideSidebar) {
      dispatch(handleOpenSidebar({ removeFromSession: false }));
    }

    if (width < 768 && sidebarRef.current) {
      dispatch(handleCloseSidebar({ storeInSession: false }));
    }
  }, [width]);

  const sidebarHidden = useSelector((state) => state.layout.sidebarHidden);

  return (
    <div id="header" className="w-full min-h-[40px] max-h-[40px] flex items-center px-8 box-border">
      {sidebarHidden && <HamburgerMenu />}
      <div className="w-full h-full flex justify-end items-center gap-1">
        <ThemeSelector />
        <LanguageSelector />
        <UserDropdown />
      </div>
    </div>
  );
};

export default Header;
