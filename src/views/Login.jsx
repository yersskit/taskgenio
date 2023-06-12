import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmailInput from "./../components/Inputs/EmailInput";
import PasswordInput from "./../components/Inputs/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { INPUT_PASSWORD, INPUT_EMAIL } from "../utils/consts";
import { loginUser } from "../store/user";
import { useTranslation } from "react-i18next";
import { REGISTER_PATH } from "./../utils/routes";
import PrimaryButton from "../components/Common/Buttons/PrimaryButton";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [enableSubmit, setEnableSubmit] = useState(false);

  const { isLoading, error } = useSelector((state) => state.user);

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
    dispatch(loginUser(formData));
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">{t("hero.login_title")}</h1>
          <p className="py-6">{t("hero.login_description")}</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <form>
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
                showConstraints={false}
              />
              {error && (
                <p className="text-error text-xs mt-2">
                  {t(`errors.${error}`)}
                </p>
              )}
              <div className="flex flex-col mt-6">
                <PrimaryButton
                  disabled={!enableSubmit}
                  onClick={onSubmit}
                  isLoading={isLoading}
                >
                  {t("actions.login")}
                </PrimaryButton>
              </div>
            </form>
            <div className="flex justify-end items-end mt-2">
              <Link
                to={REGISTER_PATH}
                className="label-text-alt link link-hover"
              >
                {t("labels.register")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
