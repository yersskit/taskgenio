import React, { useRef } from 'react';
import DeleteIcon from '../Icons/DeleteIcon';
import Modal from '../Modal';
import { DELETE_MODE } from '../../../utils/consts';
import { useTranslation } from 'react-i18next';
import SecondaryButton from '../Buttons/SecondaryButton';
import ErrorButton from '../Buttons/ErrorButton';

const Delete = ({ action, id, entity }) => {
  const { t } = useTranslation();

  const deleteActionRef = useRef();

  return (
    <>
      <Modal
        mode={DELETE_MODE}
        entity={t(`entities.${entity}`)}
        composedKey={`${DELETE_MODE}__${entity}__${id}`}
        modalRef={deleteActionRef}
        className="border-2 border-red-500"
      >
        <p className="text-red-500 font-semibold mt-6">
          {t('messages.delete', {
            entity: t(`entities.${entity}`)
          })}
        </p>
        <div className="flex justify-between w-full items-end gap-4 mt-6">
          <SecondaryButton
            onClick={() => {
              if (deleteActionRef.current) {
                deleteActionRef.current.checked = false;
              }
            }}
          >
            {t('actions.cancel')}
          </SecondaryButton>
          <ErrorButton
            onClick={() => {
              action();
              if (deleteActionRef.current) {
                deleteActionRef.current.checked = false;
              }
            }}
          >
            {t('actions.delete')}
          </ErrorButton>
        </div>
      </Modal>
      <button
        onClick={() => {
          deleteActionRef.current.checked = true;
        }}
        className="btn btn-square btn-xs btn-error text-error-content hover:bg-opacity-80"
      >
        <DeleteIcon />
      </button>
    </>
  );
};

export default Delete;
