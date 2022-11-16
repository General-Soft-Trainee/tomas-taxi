import React from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { INPUT_TYPES } from '../../../shared/components/form-elements/FormInput/form-input.constants';

import FormInput from '../../../shared/components/form-elements/FormInput/FormInput';
import Button from '../../../shared/components/Button/Button';

import {
  BUTTON_SIZES,
  BUTTON_COLORS,
  BUTTON_VARIANTS,
  BUTTON_TYPES
} from '../../../shared/components/Button/button.constants';

import { OPTIONS_VALIDATE } from '../../helpers/OPTIONS_VALIDATE';
import { PRIVATE_ROUTES, REQUEST_STATUS } from '../../../constants/app.constants';
import { useOrders } from '../../../api/hooks/useOrders/useOrders';

import ProgressSpinner from '../../../shared/components/ProgressSpinner/ProgressSpinner';

import { getUser } from '../../../slices/user.slice';

import { addNotification } from '../../../slices/notifications.slice';

import { NOTIFICATION_TYPES } from '../../../shared/components/Notifications/components/Notification/notification.constants';

import classes from './client-order.module.css';
import { defaultOrderValues } from './client-order.constants';

function ClientOrder() {
  const { t } = useTranslation();
  const { createOrder, status } = useOrders();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm({ defaultValues: defaultOrderValues, mode: 'onTouched' });

  if (status === REQUEST_STATUS.LOADING) {
    return <ProgressSpinner isShow />;
  }

  const onSubmit = async (data) => {
    await createOrder(data);
    await dispatch(getUser())
      .unwrap()
      .catch(({ message }) => {
        dispatch(addNotification({ type: NOTIFICATION_TYPES.ERROR, message }));
      });
    navigate(PRIVATE_ROUTES.CURRENT_ORDER);
  };

  return (
    <div className={classes.container}>
      <div className={classes.block__text}>
        <p className={classes.text}>{t('order_text')}</p>
        <div className={classes.line} />
      </div>
      <form className={classes.form__wrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.form__container}>
          <FormInput
            name="source"
            placeholder={t('source')}
            type={INPUT_TYPES.TEXT}
            control={control}
            error={errors?.source}
            rules={OPTIONS_VALIDATE.SOURCE}
          />
          <FormInput
            name="destination"
            placeholder={t('destination')}
            type={INPUT_TYPES.TEXT}
            className={classes.input}
            control={control}
            error={errors?.destination}
            rules={OPTIONS_VALIDATE.DESTINATION}
          />
        </div>
        <Button
          size={BUTTON_SIZES.LARGE}
          color={BUTTON_COLORS.PRIMARY}
          variant={BUTTON_VARIANTS.CONTAINED}
          type={BUTTON_TYPES.SUBMIT}
          disabled={!isValid}
        >
          {t('button.order')}
        </Button>
      </form>
      <div className={classes.decoration__container}>
        <p className={`${classes.decoration__text} ${classes.decoration__text_top}`}>
          {t('destination')}
        </p>
        <img src="/img/navigate.png" alt="NavigationImage" />
        <p className={`${classes.decoration__text} ${classes.decoration__text_bottom}`}>
          {t('source')}
        </p>
      </div>
    </div>
  );
}

export default ClientOrder;
