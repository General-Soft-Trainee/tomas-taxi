import { useState } from 'react';

import { Rating } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Button from '../../../../../shared/components/Button/Button';
import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_TYPES,
  BUTTON_VARIANTS
} from '../../../../../shared/components/Button/button.constants';
import { INPUT_TYPES } from '../../../../../shared/components/form-elements/FormInput/form-input.constants';

import Modal from '../../../../../shared/components/Modal/Modal';
import Textarea from '../../../../../shared/components/Textarea/Textarea';

import { OPTIONS_VALIDATE } from '../../../../helpers/OPTIONS_VALIDATE';

import { useReports } from '../../../../../api/hooks/useReports/useReports';

import { PRIVATE_ROUTES, REQUEST_STATUS } from '../../../../../constants/app.constants';

import ProgressSpinner from '../../../../../shared/components/ProgressSpinner/ProgressSpinner';

import { finishedUserTrip, getUser } from '../../../../../slices/user.slice';

import { tripsSelector, getActiveTrip, deleteTrip } from '../../../../../slices/trips.slice';

import { addNotification } from '../../../../../slices/notifications.slice';

import { NOTIFICATION_TYPES } from '../../../../../shared/components/Notifications/components/Notification/notification.constants';

import classes from './rate-driver-modal.module.css';

function RateDriverModal({ isOpened, closeModal }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createReport } = useReports();
  const { activeTrip, status } = useSelector(tripsSelector);
  const driverId = activeTrip.driver.id;
  const tripId = activeTrip.id;
  const [isOpenedDriverReport, setIsOpenedDriverReport] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { isValid }
  } = useForm({ defaultValues: { rating: null, report: '' }, mode: 'onTouched' });

  const showDriverReport = () => {
    setIsOpenedDriverReport(true);
  };

  const onSubmit = async ({ rating, report }) => {
    const finishTripRequests = [
      dispatch(finishedUserTrip({ driverId, rating: Number(rating * 2), tripId })),
      dispatch(deleteTrip(tripId))
    ];

    if (report) {
      finishTripRequests.push(createReport(report, tripId, driverId));
    }
    try {
      await Promise.all(finishTripRequests);
      await Promise.all([dispatch(getUser()), dispatch(getActiveTrip())]);
    } catch (error) {
      dispatch(
        addNotification({ type: NOTIFICATION_TYPES.ERROR, message: error.response.data.message })
      );
    }

    navigate(PRIVATE_ROUTES.HOME);
  };

  if (status === REQUEST_STATUS.LOADING) {
    return <ProgressSpinner isShow />;
  }

  return (
    <Modal isOpened={isOpened} closeModal={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.rate__driver__content}>
          <h2 className={classes.rate__driver__title}>{t('rate_driver_title')}</h2>
          <div>
            <Controller
              control={control}
              name="rating"
              rules={OPTIONS_VALIDATE.RATING}
              render={({ field }) => (
                <Rating sx={{ marginTop: '20px' }} precision={0.5} size="large" {...field} />
              )}
            />
          </div>
          {isOpenedDriverReport && (
            <Textarea
              name="report"
              placeholder={t('driver_report')}
              type={INPUT_TYPES.TEXT}
              control={control}
              className={classes.rate__driver__textarea}
            />
          )}
          <div className={classes.rate__driver__actions}>
            {isOpenedDriverReport || (
              <Button
                variant={BUTTON_VARIANTS.CONTAINED}
                size={BUTTON_SIZES.MEDIUM_LONG}
                color={BUTTON_COLORS.ERROR}
                className={classes.rate__driver_button}
                onClick={showDriverReport}
              >
                {t('button.report_driver')}
              </Button>
            )}
            <Button
              variant={BUTTON_VARIANTS.CONTAINED}
              size={BUTTON_SIZES.MEDIUM_LONG}
              color={BUTTON_COLORS.SUCCESS}
              type={BUTTON_TYPES.SUBMIT}
              disabled={!isValid}
            >
              {t('button.submit')}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

RateDriverModal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default RateDriverModal;
