import React from 'react';
import { useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';

const UserDropdown = () => {
  // TODO: implementar funciones
  // TODO: implementar foto de perfil

  const session = useSelector((state) => state.user.session);

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-sm text-sm flex items-center justify-start gap-2 cursor-pointer rounded p-0 overflow-hidden w-[36px] ml-4 border-none"
      >
        <div className="h-full w-full flex justify-center items-center relative">
          {session ? (
            <img
              className="absolute top-0 bottom-0 right-0 left-0 m-auto"
              src="https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="profile"
            />
          ) : (
            <FaUser />
          )}
        </div>
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu-vertical shadow rounded w-52 mt-1 min-h-min max-h-max overflow-x-auto p-2 box-border bg-base-200"
      >
        {!session && (
          <>
            <li
              onClick={() => {}}
              className={`btn btn-sm normal-case flex flex-row justify-between rounded text-xs border-none mt-2 first:mt-0 bg-base-100 text-base-content hover:bg-base-300 hover:text-base-content outline-base-content`}
            >
              <p className="text-left">Login</p>
            </li>
            <li
              onClick={() => {}}
              className={`btn btn-sm normal-case flex flex-row justify-between rounded text-xs border-none mt-2 first:mt-0 bg-base-100 text-base-content hover:bg-base-300 hover:text-base-content outline-base-content`}
            >
              <p className="text-left">Register</p>
            </li>
          </>
        )}
        {session && (
          <>
            <li
              onClick={() => {}}
              className={`btn btn-sm normal-case flex flex-row justify-between rounded text-xs border-none mt-2 first:mt-0 bg-base-100 text-base-content hover:bg-base-300 hover:text-base-content outline-base-content`}
            >
              <p className="text-left">My Account</p>
            </li>
            <li
              onClick={() => {}}
              className={`btn btn-sm normal-case flex flex-row justify-between rounded text-xs border-none mt-2 first:mt-0 bg-base-100 text-base-content hover:bg-base-300 hover:text-base-content outline-base-content`}
            >
              <p className="text-left">Log out</p>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default UserDropdown;
