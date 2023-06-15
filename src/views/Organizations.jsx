import React, { useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout/Layout';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../components/Common/Modal';
import { CREATE_MODE, INPUT_NAME, ORGANIZATION_ENTITY } from '../utils/consts';
import ViewHeader from '../components/Layout/ViewHeader';
import ViewContent from '../components/Layout/ViewContent';
import View from '../components/Layout/View';
import Table from './../components/Common/Table/Table';
import Delete from '../components/Common/Actions/Delete';
import TextInput from './../components/Inputs/TextInput';
import { createOrganization, getOrganizations } from '../store/organization';

const Organizations = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const createOrganizationRef = useRef();

  const { organizations, isLoading, error } = useSelector((state) => state.organization);
  const { session } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [enableSubmit, setEnableSubmit] = useState(false);

  const onChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const checkFormValid = () => {
    let valid = true;

    const dataLength = Object.keys(formData).length;
    const errorsLength = Object.keys(errors).length;

    if (dataLength === errorsLength) {
      for (let i = 0; i < Object.keys(errors).length; i++) {
        const element = Object.keys(errors)[i];

        if (errors[element].length > 0) {
          valid = false;
        }
      }
    } else {
      valid = false;
    }

    setEnableSubmit(valid);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(createOrganization({ ...formData, owner: session.$id }));

    if (createOrganizationRef.current) {
      createOrganizationRef.current.checked = false;
    }

    setFormData({ name: '' });
  };

  const handleOpenModal = () => {
    setFormData({ name: '' });
    createOrganizationRef.current.checked = true;
  };

  useEffect(() => {
    checkFormValid();
  }, [formData]);

  useEffect(() => {
    dispatch(getOrganizations(session.$id));
  }, []);

  return (
    <Layout>
      <View>
        <ViewHeader title={t('menu.members')}>
          <button
            onClick={handleOpenModal}
            className="btn btn-sm btn-primary normal-case"
            disabled={error || isLoading}>
            {t(`actions.${CREATE_MODE}`) + ' ' + t(`entities.${ORGANIZATION_ENTITY}`)}
          </button>
        </ViewHeader>
        <ViewContent>
          <Modal
            mode={CREATE_MODE}
            entity={t(`entities.${ORGANIZATION_ENTITY}`)}
            composedKey={`${CREATE_MODE}__${ORGANIZATION_ENTITY}`}
            modalRef={createOrganizationRef}>
            <form action="">
              <TextInput
                name={INPUT_NAME}
                required
                disabled={isLoading}
                onChange={onChange}
                value={formData.name}
                errors={errors.name}
                setErrors={setErrors}
              />
              <div className="flex flex-col mt-6">
                <button
                  type="submit"
                  disabled={!enableSubmit || isLoading}
                  onClick={onSubmit}
                  className={`btn btn-primary ${isLoading ? 'loading' : ''}`}>
                  {t('actions.save')}
                </button>
              </div>
            </form>
          </Modal>
          <Table
            name={ORGANIZATION_ENTITY}
            data={organizations}
            hidden={[
              '$id',
              '$updatedAt',
              '$permissions',
              '$collectionId',
              '$databaseId',
              'owner',
              'teamId',
              'avatar',
              'role',
              'userId'
            ]}
            controls={(row) => (
              <>
                <Delete id={row.$id} action={() => {}} entity={ORGANIZATION_ENTITY} />
              </>
            )}
          />
        </ViewContent>
      </View>
    </Layout>
  );
};

export default Organizations;
