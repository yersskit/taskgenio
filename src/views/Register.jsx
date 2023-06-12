import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import TextInput from '../components/Inputs/TextInput';
import EmailInput from '../components/Inputs/EmailInput';
import { INPUT_NAME, INPUT_EMAIL, INPUT_PASSWORD } from '../utils/consts';
import PasswordInput from '../components/Inputs/PasswordInput';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from './../store/user';
import { LOGIN_PATH, HOME_PATH } from '../utils/routes';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [enableSubmit, setEnableSubmit] = useState(false);

  const { userCreated, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    checkFormValid();
  }, [formData]);

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
    dispatch(createUser(formData));
  };

  if (userCreated && !isLoading && !error) {
    return <Navigate to={HOME_PATH} />;
  }

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">{t('hero.register_title')}</h1>
          <p className="py-6">{t('hero.register_description')}</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <form>
              <TextInput
                disabled={isLoading}
                name={INPUT_NAME}
                onChange={onChange}
                value={formData[INPUT_NAME]}
                required
                errors={errors[INPUT_NAME]}
                setErrors={setErrors}
              />
              <EmailInput
                disabled={isLoading}
                name={INPUT_EMAIL}
                onChange={onChange}
                value={formData[INPUT_EMAIL]}
                required
                errors={errors[INPUT_EMAIL]}
                setErrors={setErrors}
              />
              <PasswordInput
                disabled={isLoading}
                name={INPUT_PASSWORD}
                onChange={onChange}
                value={formData[INPUT_PASSWORD]}
                required
                errors={errors[INPUT_PASSWORD]}
                setErrors={setErrors}
                showConstraints={true}
              />
              {error && <p className="text-error text-xs mt-2">{t(`errors.${error}`)}</p>}
              <div className="flex flex-col mt-6">
                <button
                  type="submit"
                  disabled={!enableSubmit || isLoading}
                  onClick={onSubmit}
                  className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
                >
                  {t('actions.register')}
                </button>
              </div>
            </form>
            <div className="flex justify-end items-end mt-2">
              <Link to={LOGIN_PATH} className="label-text-alt link link-hover">
                {t('labels.login')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
