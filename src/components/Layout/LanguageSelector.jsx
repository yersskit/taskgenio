import React from 'react';
import { langs } from '../../utils/languages';
import { useTranslation } from 'react-i18next';
import { HiOutlineTranslate, HiOutlineChevronDown } from 'react-icons/hi';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const [currentLang] = i18n.language.split('-');

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-sm text-sm flex items-center justify-start gap-2 cursor-pointer p-2 rounded"
      >
        <HiOutlineTranslate />
        <HiOutlineChevronDown />
      </button>
      <ul
        tabIndex={0}
        className="dropdown-content menu-vertical shadow rounded w-44 mt-1 h-[340px] overflow-x-auto p-2 box-border bg-base-200"
      >
        {Object.keys(langs).map((lng) => {
          return (
            <li
              key={lng}
              onClick={i18n.language === lng ? null : () => i18n.changeLanguage(lng)}
              className={`whitespace-nowrap items-center btn btn-sm normal-case flex flex-row justify-end rounded gap-4 text-xs border-none mt-2 first:mt-0 bg-base-100 text-base-content hover:bg-base-300 hover:text-base-content outline-base-content`}
            >
              {currentLang === lng && (
                <svg
                  className="w-4 h-4 mr-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
              {t(`languages.${lng}`)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LanguageSelector;
