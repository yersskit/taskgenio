import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import View from '../components/Layout/View';
import { useTranslation } from 'react-i18next';
import ViewHeader from '../components/Layout/ViewHeader';
import ViewContent from '../components/Layout/ViewContent';
import { useDispatch, useSelector } from 'react-redux';
import EditPhotoIcon from '../components/Common/Icons/EditPhotoIcon';
import { getAvatar, updateAvatar, uploadAvatar } from '../store/user';
import placeholderPhoto from '/placeholderPhoto.jpg';
import Resizer from 'react-image-file-resizer';
import TextInput from './../components/Inputs/TextInput';
import { INPUT_EMAIL, INPUT_NAME, INPUT_PHONE } from '../utils/consts';
import EmailInput from './../components/Inputs/EmailInput';
import SectionLoader from '../components/Common/SectionLoader';

const Account = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { session, isLoading } = useSelector((state) => state.user);

  const [edit, setEdit] = useState(false);

  const updateAvatarInfo = (event) => {
    let action = null;
    let currentAvatar = session.prefs.avatar;

    if (currentAvatar) {
      action = 'update';
    } else {
      action = 'upload';
    }

    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      Resizer.imageFileResizer(
        event.target.files[0],
        500, // max width
        500, // max height
        'JPEG', // compress format WEBP, JPEG, PNG
        80, // quality
        0, // rotation
        (file) => {
          // Your upload logic here

          console.log('action: ', action);
          if (action === 'upload') {
            dispatch(uploadAvatar({ file: file, userId: session.$id }));
          } else {
            dispatch(updateAvatar({ file: file, userId: session.$id, fileId: currentAvatar }));
          }
        },
        'file' // output type base64 or blob
      );
    }
  };

  useEffect(() => {
    dispatch(getAvatar(session.email));
  }, [session.avatarUrl]);

  return (
    <Layout>
      <View>
        <ViewHeader title={t('labels.account')} name={session.name}></ViewHeader>
        <ViewContent>
          <div className="flex gap-12">
            <div className="flex-1 min-w-[150px] w-[500px] max-w-[500px] relative text-transparent hover:text-white hover:text-opacity-75 bg-transparent hover:bg-black hover:bg-opacity-25">
              {isLoading && <SectionLoader />}
              <label
                htmlFor="selectImage"
                className="bg-inherit z-10 w-full h-full absolute cursor-pointer rounded-md">
                <EditPhotoIcon className="absolute z-20 text-[70px] text-inherit m-auto top-0 left-0 right-0 bottom-0" />
              </label>
              <input
                id="selectImage"
                type="file"
                className="hidden"
                accept="image/jpeg, image/png"
                onChange={updateAvatarInfo}
              />
              <img
                className="object-cover w-full h-full rounded-md"
                src={session.avatarUrl || placeholderPhoto}
                alt="no-image"
              />
            </div>
            <div className="flex-1 flex flex-col border border-neutral p-4 rounded box-border gap-4">
              <TextInput name={INPUT_NAME} value={session.name} required={true} disabled={!edit} />
              <EmailInput
                name={INPUT_EMAIL}
                value={session.email}
                required={true}
                disabled={!edit}
              />
              <TextInput
                name={INPUT_PHONE}
                value={session.phone}
                required={false}
                disabled={!edit}
              />
              <div className="flex mt-auto items center justify-end">
                {edit ? (
                  <>
                    <button className="btn btn-secondary mr-4" onClick={() => setEdit(false)}>
                      {t('actions.cancel')}
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setEdit(false);
                      }}>
                      {t('actions.save')}
                    </button>
                  </>
                ) : (
                  <button className="btn btn-primary" onClick={() => setEdit(true)}>
                    {t('actions.edit')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </ViewContent>
      </View>
    </Layout>
  );
};

export default Account;
