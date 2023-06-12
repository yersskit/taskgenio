import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from './Icons/CloseIcon';

const Modal = ({ mode, entity, composedKey, modalRef, children, className }) => {
  const { t } = useTranslation();

  return (
    <>
      <input type="checkbox" id={composedKey} className="modal-toggle" ref={modalRef} />

      <label htmlFor={composedKey} id={composedKey} className="modal">
        <div className={`modal-box ${className ? className : ''}`}>
          <label
            htmlFor={composedKey}
            className="btn btn-xs btn-square absolute right-2 top-2 bg-transparent text-neutral border-0 hover:bg-neutral hover:text-neutral-content"
          >
            <CloseIcon />
          </label>
          <h3 className="font-bold text-lg">{t(`actions.${mode}`) + ' ' + entity}</h3>
          {children && <div className="mt-4">{children}</div>}
        </div>
      </label>
    </>
  );
};

export default Modal;
