import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import Button from '../../../../shared/components/Button/Button';

import { INPUT_TYPES } from '../../../../shared/components/form-elements/FormInput/form-input.constants';
import FormInput from '../../../../shared/components/form-elements/FormInput/FormInput';
import { OPTIONS_VALIDATE } from '../../../helpers/OPTIONS_VALIDATE';

import { BUTTON_TYPES } from '../../../../shared/components/Button/button.constants';

import { resetUserPassword } from '../../../../slices/user.slice';

import { addNotification } from '../../../../slices/notifications.slice';
import { NOTIFICATION_TYPES } from '../../../../shared/components/Notifications/components/Notification/notification.constants';

import classes from './forgot-password.module.css';

function ForgotPassword({ isOpened, onClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid }
  } = useForm({ defaultValues: { email: '' }, mode: 'all' });

  const onSubmit = async ({ email }) => {
    await dispatch(resetUserPassword({ email: email.toLowerCase() }))
      .unwrap()
      .catch(({ message }) => {
        dispatch(addNotification({ type: NOTIFICATION_TYPES.ERROR, message }));
        reset({ email: '' });
      });
    onClose();
  };

  return (
    <div>
      {isOpened && (
        <div className={classes.container}>
          <p className={classes.text}>{t('forgot_password_text')}</p>
          <button type="button" className={classes.container__close} onClick={onClose}>
            +
          </button>
          <form className={classes.form__container} onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              name="email"
              placeholder={t('input_name.email')}
              type={INPUT_TYPES.EMAIL}
              control={control}
              error={errors?.email}
              rules={OPTIONS_VALIDATE.EMAIL}
            />
            <Button
              variant="form"
              color="form"
              className={classes.button}
              type={BUTTON_TYPES.SUBMIT}
              disabled={!isValid}
            >
              {t('button.send')}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

ForgotPassword.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ForgotPassword;
