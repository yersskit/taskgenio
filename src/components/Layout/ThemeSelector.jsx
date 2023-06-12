import React, { useState, useEffect } from "react";
import { LOCAL_STORAGE_THEME_KEY } from "../../utils/consts";
import { themes } from "../../utils/themes";
import { HiOutlineChevronDown } from "react-icons/hi";
import { IoColorPaletteOutline } from "react-icons/io5";

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState();

  const toggleTheme = (value) => {
    setCurrentTheme(value);
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, value);
  };

  useEffect(() => {
    const localStorageTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    if (localStorageTheme) {
      toggleTheme(localStorageTheme);
    }
  }, []);

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-sm text-sm flex items-center justify-start gap-2 cursor-pointer p-2 rounded"
      >
        <IoColorPaletteOutline />
        <HiOutlineChevronDown />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu-vertical shadow rounded w-52 mt-1 h-[340px] overflow-x-auto p-2 box-border bg-base-200"
      >
        {themes.map((theme) => (
          <li
            data-theme={theme}
            key={theme}
            onClick={() => toggleTheme(theme)}
            className={`btn btn-sm capitalize flex flex-row justify-between rounded text-xs border-none mt-2 first:mt-0 bg-base-100 text-base-content hover:bg-base-300 hover:text-base-content outline-base-content`}
          >
            {currentTheme === theme && (
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            )}
            <p className="text-left">{theme}</p>
            <div className="flex flex-shrink-0 flex-wrap gap-1 h-1/2">
              <div className="bg-primary w-2 rounded"></div>
              <div className="bg-secondary w-2 rounded"></div>
              <div className="bg-accent w-2 rounded"></div>
              <div className="bg-neutral w-2 rounded"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
