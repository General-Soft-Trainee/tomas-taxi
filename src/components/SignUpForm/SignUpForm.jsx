import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import {
  BUTTON_TYPES,
  BUTTON_VARIANTS,
  BUTTON_COLORS
} from '../../shared/components/Button/button.constants';

import Button from '../../shared/components/Button/Button';

import { USER_ROLES } from '../../constants/user-roles.constants';

import { PUBLIC_ROUTES, REQUEST_STATUS } from '../../constants/app.constants';

import { NOTIFICATION_TYPES } from '../../shared/components/Notifications/components/Notification/notification.constants';

import { registrationUser, userSelector } from '../../slices/user.slice';

import { addNotification } from '../../slices/notifications.slice';

import ProgressSpinner from '../../shared/components/ProgressSpinner/ProgressSpinner';

import classes from './sign-up-form.module.css';
import { defaultRegisterValues } from './sign-up-form.constants';
import CarForm from './components/CarForm/CarForm';
import GeneralForm from './components/GeneralForm/GeneralForm';

function SignUpForm() {
  const { t } = useTranslation();
  const { status } = useSelector(userSelector);
  const [isHasSectionDriver, setIsSectionDriver] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm({ defaultValues: defaultRegisterValues, mode: 'all' });

  useEffect(() => {
    const subscribe = watch(({ role }) => {
      setIsSectionDriver(role.toLowerCase() === USER_ROLES.DRIVER);
    });
    return () => subscribe.unsubscribe();
  }, [watch]);

  if (status === REQUEST_STATUS.LOADING) {
    return <ProgressSpinner isShow />;
  }

  const onSubmit = (data) => {
    const { confirmPassword, ...driverState } = data;
    if (isHasSectionDriver) {
      dispatch(registrationUser(driverState))
        .unwrap()
        .then(() => navigate(PUBLIC_ROUTES.LOGIN))
        .catch(({ message }) =>
          dispatch(
            addNotification({
              type: NOTIFICATION_TYPES.ERROR,
              message
            })
          )
        );
      reset(defaultRegisterValues);
    } else {
      const { car, ...clientState } = driverState;
      dispatch(registrationUser(clientState))
        .unwrap()
        .then(() => navigate(PUBLIC_ROUTES.LOGIN))
        .catch(({ message }) =>
          dispatch(
            addNotification({
              type: NOTIFICATION_TYPES.ERROR,
              message
            })
          )
        );
      reset(defaultRegisterValues);
    }
  };

  return (
    <form className={classes.form__wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.form__content}>
        <h1 className={classes.form__title}>{t('sign_up')}</h1>
        <div className={classes.form__container}>
          <GeneralForm control={control} errors={errors} watch={watch} />
          {isHasSectionDriver && <CarForm control={control} errors={errors} />}
          <Button
            variant={BUTTON_VARIANTS.FORM}
            disabled={!isValid}
            type={BUTTON_TYPES.SUBMIT}
            color={BUTTON_COLORS.FORM}
            className={classes.form__button}
          >
            {t('button.register')}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
