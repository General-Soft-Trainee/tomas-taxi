import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import {
  BUTTON_TYPES,
  BUTTON_VARIANTS,
  BUTTON_COLORS
} from '../../shared/components/Button/button.constants';

import Button from '../../shared/components/Button/Button';

import { USER_ROLES } from '../../constants/user-roles.constants';

import { PUBLIC_ROUTES } from '../../constants/app.constants';

import { NOTIFICATION_TYPES } from '../../shared/components/Notifications/components/Notification/notification.constants';

import { registrationUser } from '../../reducers/user.slice';

import { addNotification } from '../../reducers/notifications.slice';

import classes from './sign-up-form.module.css';
import { defaultRegisterValues } from './sign-up-form.constants';
import CarForm from './components/CarForm/CarForm';
import GeneralForm from './components/GeneralForm/GeneralForm';

function SignUpForm() {
  const [isHasSectionDriver, setIsSectionDriver] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid }
  } = useForm({ defaultValues: defaultRegisterValues, mode: 'onTouched' });

  useEffect(() => {
    const subscribe = watch(({ role }) => {
      setIsSectionDriver(role.toLowerCase() === USER_ROLES.DRIVER);
    });
    return () => subscribe.unsubscribe();
  }, [watch]);

  const onSubmit = async (data) => {
    const { confirmPassword, ...driverState } = data;
    try {
      if (isHasSectionDriver) {
        await dispatch(registrationUser(driverState));
      } else {
        const { car, ...clientState } = driverState;
        await dispatch(registrationUser(clientState));
      }
      navigate(PUBLIC_ROUTES.LOGIN);
    } catch (error) {
      dispatch(
        addNotification({ type: NOTIFICATION_TYPES.ERROR, message: error.response.data.message })
      );
    }
  };

  return (
    <form className={classes.form__wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.form__content}>
        <h1 className={classes.form__title}>Sign Up</h1>
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
            Register
          </Button>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
