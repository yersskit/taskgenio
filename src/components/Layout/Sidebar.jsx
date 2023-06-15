import React from 'react';
import { AiOutlineProject, AiOutlineHome } from 'react-icons/ai';
import { VscOrganization } from 'react-icons/vsc';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HOME_PATH,
  MEMBERS_PATH,
  ORGANIZATIONS_PATH,
  PROJECTS_PATH,
  SETTINGS_PATH,
  TEAMS_PATH
} from '../../utils/routes';
import { useTranslation } from 'react-i18next';
import { BsChevronDoubleLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { handleCloseSidebar } from '../../store/layout';
import { AiOutlineSetting } from 'react-icons/ai';
import Logo from './Logo';
import OrganizationsIcon from '../Common/Icons/OrganizationsIcon';
import TeamsIcon from '../Common/Icons/TeamsIcon';

const Sidebar = ({ sidebarRef }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sidebarHidden = useSelector((state) => state.layout.sidebarHidden);

  const onClickMenu = (route) => {
    if (location.pathname !== route) {
      navigate(route);
    }
  };

  return (
    <div
      ref={sidebarRef}
      id="sidebar"
      className="w-52 min-h-screen pt-6 pb-10 overflow-y-auto scrollbar-y text-sm relative">
      <div className="px-6">
        <Logo />
      </div>
      <nav className="px-4 pt-12 w-full flex flex-col flex-wrap">
        <ul className="space-y-1.5">
          <li
            onClick={() => onClickMenu(HOME_PATH)}
            className={`flex items-center gap-x-3.5 py-2 px-2.5 cursor-pointer rounded`}>
            <AiOutlineHome className="w-3.5 h-3.5" />
            {t('menu.home')}
          </li>
          <li
            onClick={() => onClickMenu(PROJECTS_PATH)}
            className={`flex items-center gap-x-3.5 py-2 px-2.5 cursor-pointer rounded`}>
            <AiOutlineProject className="w-3.5 h-3.5" />
            {t('menu.projects')}
          </li>
          <li
            onClick={() => onClickMenu(ORGANIZATIONS_PATH)}
            className={`flex items-center gap-x-3.5 py-2 px-2.5 cursor-pointer rounded`}>
            <OrganizationsIcon className="w-3.5 h-3.5" />
            {t('menu.organizations')}
          </li>
          <li
            onClick={() => onClickMenu(MEMBERS_PATH)}
            className={`flex items-center gap-x-3.5 py-2 px-2.5 cursor-pointer rounded`}>
            <VscOrganization className="w-3.5 h-3.5" />
            {t('menu.members')}
          </li>
          <li
            onClick={() => onClickMenu(TEAMS_PATH)}
            className={`flex items-center gap-x-3.5 py-2 px-2.5 cursor-pointer rounded`}>
            <TeamsIcon className="w-3.5 h-3.5" />
            {t('menu.teams')}
          </li>
          <li
            onClick={() => onClickMenu(SETTINGS_PATH)}
            className={`flex items-center gap-x-3.5 py-2 px-2.5 cursor-pointer rounded`}>
            <AiOutlineSetting className="w-3.5 h-3.5" />
            {t('menu.settings')}
          </li>
        </ul>
      </nav>
      {!sidebarHidden && (
        <button
          type="button"
          onClick={() => dispatch(handleCloseSidebar({ storeInSession: true }))}
          className="mr-auto p-2 bg-neutral text-neutral-content hover:bg-neutral-focus absolute bottom-4 right-4 rounded-btn">
          <BsChevronDoubleLeft />
        </button>
      )}
    </div>
  );
};

export default Sidebar;
