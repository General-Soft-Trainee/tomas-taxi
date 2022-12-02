import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import FormInput from '../../shared/components/form-elements/FormInput/FormInput';
import FormCheckbox from '../../shared/components/form-elements/FormCheckbox/FormCheckbox';
import { INPUT_TYPES } from '../../shared/components/form-elements/FormInput/form-input.constants';
import Link from '../../shared/components/Link/Link';
import { PRIVATE_ROUTES, PUBLIC_ROUTES, REQUEST_STATUS } from '../../constants/app.constants';
import Button from '../../shared/components/Button/Button';
import { OPTIONS_VALIDATE } from '../helpers/OPTIONS_VALIDATE';
import {
  BUTTON_COLORS,
  BUTTON_TYPES,
  BUTTON_VARIANTS
} from '../../shared/components/Button/button.constants';

import LocalStorageService from '../../services/LocalStorageService';

import { NOTIFICATION_TYPES } from '../../shared/components/Notifications/components/Notification/notification.constants';

import { loginUser } from '../../slices/user.slice';

import { addNotification } from '../../slices/notifications.slice';

import ProgressSpinner from '../../shared/components/ProgressSpinner/ProgressSpinner';

import { defaultLoginValues } from './sign-in-form.constants';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

import classes from './sign-in-form.module.css';

function SignInForm() {
  const { t } = useTranslation();
  const [loginRequestStatus, setLoginRequestStatus] = useState(REQUEST_STATUS.IDLE);
  const [isOpenedForgotPassword, setIsOpenedForgotPassword] = useState(false);
  const [isKeepLoggedInChecked, setIsKeepLoggedInChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid }
  } = useForm({ defaultValues: defaultLoginValues, mode: 'all' });
  const handleCheckboxChange = (e) => {
    setIsKeepLoggedInChecked(e.target.checked);
  };

  const showForgotPassword = () => {
    setIsOpenedForgotPassword(true);
  };

  const closeForgotPassword = () => {
    setIsOpenedForgotPassword(false);
  };

  const onSubmit = ({ email, password }) => {
    setLoginRequestStatus(REQUEST_STATUS.LOADING);
    dispatch(loginUser({ email: email.toLowerCase(), password }))
      .then(() => {
        setLoginRequestStatus(REQUEST_STATUS.SUCCESS);
        navigate(PRIVATE_ROUTES.HOME);
        reset(defaultLoginValues);
      })
      .catch(({ message }) => {
        setLoginRequestStatus(REQUEST_STATUS.FAILED);
        dispatch(addNotification({ type: NOTIFICATION_TYPES.ERROR, message }));
      });

    if (isKeepLoggedInChecked) {
      LocalStorageService.keepUserLoginIn = isKeepLoggedInChecked;
    }
  };

  if (loginRequestStatus === REQUEST_STATUS.LOADING) {
    return <ProgressSpinner isShow />;
  }

  return (
    <div>
      <ForgotPassword isOpened={isOpenedForgotPassword} onClose={closeForgotPassword} />
      <form className={classes.form__wrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.form__content}>
          <h1 className={classes.form__title}>{t('sign_in')}</h1>
          <div className={classes.form__container}>
            <div>
              <FormInput
                name="email"
                placeholder={t('input_name.email')}
                type={INPUT_TYPES.EMAIL}
                control={control}
                className={classes.form__input}
                error={errors?.email}
                rules={OPTIONS_VALIDATE.EMAIL}
              />
              <FormInput
                name="password"
                placeholder={t('input_name.password')}
                type={INPUT_TYPES.PASSWORD}
                control={control}
                className={classes.form__input}
                error={errors?.password}
                rules={OPTIONS_VALIDATE.PASSWORD}
              />
              <FormCheckbox
                id="checkbox"
                label={t('keep_me_logged_in')}
                checked={isKeepLoggedInChecked}
                onChange={handleCheckboxChange}
                className={classes.form__checkbox}
              />
              <Button
                variant={BUTTON_VARIANTS.FORM}
                type={BUTTON_TYPES.SUBMIT}
                color={BUTTON_COLORS.FORM}
                disabled={!isValid}
                className={classes.form__button}
              >
                {t('button.login')}
              </Button>
              <button className={classes.button__link} type="button" onClick={showForgotPassword}>
                {t('forgot_password')}
              </button>
              <Link to={PUBLIC_ROUTES.REGISTER} className={classes.link}>
                <button className={classes.button__link} type="button" onClick={showForgotPassword}>
                  {t('no_account')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
