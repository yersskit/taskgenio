import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/user';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { storage } from '../../utils/appwriteConfig';
import { avatars_storage_id } from '../../utils/collections';
import AstronautPlaceholderIcon from '../Common/Icons/AstronautPlaceholderIcon';

const UserDropdown = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [profilePhoto, setProfilePhoto] = useState(null);

  const getProfilePicture = async () => {
    try {
      let response = await storage.getFile(avatars_storage_id, user.session.$id);
      if (response) {
        let url = storage.getFileView(avatars_storage_id, user.session.$id);

        setProfilePhoto(url);
      }
    } catch (error) {
      setProfilePhoto(null);
    }
  };

  useEffect(() => {
    getProfilePicture();
  }, []);

  useEffect(() => {
    if (!user.session.avatarUrl) {
      getProfilePicture();
    }
  }, [user.session.avatarUrl]);

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-sm text-sm flex items-center justify-start gap-2 cursor-pointer rounded p-0 overflow-hidden w-[36px] ml-4 border-none">
        {profilePhoto ? (
          <img
            className="object-cover w-full rounded overflow-hidden box-border bg-transparent object-top"
            src={profilePhoto}
            alt="profile"
          />
        ) : (
          <div className="w-full h-full bg-inherit flex items-center justify-center overflow-hidden">
            <AstronautPlaceholderIcon className="-mb-[10px] text-[24px]" />
          </div>
        )}
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu-vertical shadow rounded w-52 mt-3 min-h-min max-h-max overflow-x-auto p-2 box-border bg-base-200">
        <li>
          <Link
            className="btn btn-sm normal-case flex flex-row justify-between rounded text-xs border-none mt-2 first:mt-0 bg-base-100 text-base-content hover:bg-base-300 hover:text-base-content outline-base-content"
            to="/account">
            <p className="text-left">{t('labels.account')}</p>
          </Link>
        </li>
        <li
          onClick={() => dispatch(logoutUser())}
          className={`btn btn-sm normal-case flex flex-row justify-between rounded text-xs border-none mt-2 first:mt-0 bg-base-100 text-base-content hover:bg-base-300 hover:text-base-content outline-base-content`}>
          <p className="text-left">{t('actions.logout')}</p>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdown;
