import React, { useEffect } from 'react';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import HamburgerMenu from './HamburgerMenu';
import { useSelector, useDispatch } from 'react-redux';
import { useCurrentWidth } from '../../hooks/useCurrentWidth';
import { handleCloseSidebar, handleOpenSidebar } from '../../store/layout';
import UserDropdown from './UserDropdown';
import { getOrganizations, setCurrentOrganization } from '../../store/organization';
import { useTranslation } from 'react-i18next';

const Header = ({ sidebarRef }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let width = useCurrentWidth();

  const sidebarHidden = useSelector((state) => state.layout.sidebarHidden);
  const { currentOrganization, organizations } = useSelector((state) => state.organization);
  const { session } = useSelector((state) => state.user);

  const onChange = (e) => {
    dispatch(setCurrentOrganization(e.target.value));
  };

  useEffect(() => {
    dispatch(getOrganizations(session.$id));
  }, [session.$id]);

  useEffect(() => {
    let sessionHideSidebar = sessionStorage.getItem('sidebarHidden');

    if (width > 768 && sidebarRef.current && !sessionHideSidebar) {
      dispatch(handleOpenSidebar({ removeFromSession: false }));
    }

    if (width < 768 && sidebarRef.current) {
      dispatch(handleCloseSidebar({ storeInSession: false }));
    }
  }, [width]);

  return (
    <div
      id="header"
      className="w-full min-h-[40px] max-h-[50px] flex items-center px-8 box-border py-4">
      {sidebarHidden && <HamburgerMenu />}
      <div className="flex items-center justify-start gap-4">
        <p className="text-sm">{t('entities.organization')}</p>
        <select
          className="text-sm px-4 py-1 border rounded "
          name="organization"
          required
          disabled={false}
          onChange={onChange}
          value={currentOrganization}>
          <option disabled value="">
            {t('labels.select')}
          </option>
          {organizations.map((organization) => (
            <option key={organization.$id} value={organization.$id}>
              {organization.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full h-full flex justify-end items-center gap-1">
        <ThemeSelector />
        <LanguageSelector />
        <UserDropdown />
      </div>
    </div>
  );
};

export default Header;
