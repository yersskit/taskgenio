import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearToasts, removeToast } from '../../store/toast';
import CloseIcon from '../Common/Icons/CloseIcon';
import { useTranslation } from 'react-i18next';
import { TYPE_SUCCESS } from '../../utils/consts';

const Toasts = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { messages, toastDuration } = useSelector((state) => state.toast);

  useEffect(() => {
    dispatch(clearToasts());
  }, []);

  //filter success messages and hide them after 3 seconds
  useEffect(() => {
    const successMessages = messages.filter((message) => message.type === TYPE_SUCCESS);
    if (successMessages.length > 0) {
      setTimeout(() => {
        successMessages.forEach((message) => dispatch(removeToast(message.id)));
      }, toastDuration);
    }
  }, [messages]);

  const alertTypes = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info'
  };

  return (
    <div className="toast flex flex-col-reverse items-end gap-2 z-30">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`alert relative py-3 px-5 ${alertTypes[message.type]} max-w-max shadow-lg`}
        >
          <p className="font-semibold text-sm">{t(`alerts.${message.title}`)}</p>
          <p className="text-sm">{t(`${message.type}_messages.${message.body}`)}</p>
          <button
            className="hover:scale-110 transition duration-300"
            onClick={() => dispatch(removeToast(message.id))}
          >
            <CloseIcon />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toasts;
