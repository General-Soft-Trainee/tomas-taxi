import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import Button from '../../../shared/components/Button/Button';
import Refresh from '../../../shared/components/Refresh/Refresh';
import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_VARIANTS
} from '../../../shared/components/Button/button.constants';
import { PRIVATE_ROUTES, REQUEST_STATUS } from '../../../constants/app.constants';

import { useOffers } from '../../../api/hooks/useOffers/useOffers';

import { useOrders } from '../../../api/hooks/useOrders/useOrders';

import ProgressSpinner from '../../../shared/components/ProgressSpinner/ProgressSpinner';

import CancelOrderConfirmationModal from '../../../shared/components/ConfirmationModal/ConfirmationModal';

import { useModal } from '../../../shared/hooks/useModal';

import { getUser, userSelector } from '../../../slices/user.slice';

import { addNotification } from '../../../slices/notifications.slice';

import { NOTIFICATION_TYPES } from '../../../shared/components/Notifications/components/Notification/notification.constants';

import NotFoundData from '../../../shared/components/NotFoundData/NotFoundData';

import classes from './client-current-order.module.css';
import DriverCard from './components/DriverCard/DriverCard';

function ClientCurrentOrder() {
  const { t } = useTranslation();
  const {
    isModalOpened: isConfirmationModalOpened,
    openModal: openConfirmationModal,
    closeModal: closeConfirmationModal
  } = useModal();
  const { offers, getOffers, status: offerRequestStatus } = useOffers();
  const {
    orders: { source, destination, id },
    status: orderRequestStatus,
    getOrders,
    deleteOrder
  } = useOrders();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    userData: { currentOrder }
  } = useSelector(userSelector);

  useEffect(() => {
    if (!currentOrder) {
      navigate(PRIVATE_ROUTES.HOME);
    } else {
      getOrders();
      getOffers(currentOrder);
    }
  }, [currentOrder, getOffers, getOrders, navigate]);

  if (
    offerRequestStatus === REQUEST_STATUS.LOADING ||
    orderRequestStatus === REQUEST_STATUS.LOADING
  ) {
    return <ProgressSpinner isShow />;
  }

  const handleCancelOrder = async () => {
    closeConfirmationModal();

    await deleteOrder(id);
    await dispatch(getUser())
      .unwrap()
      .catch(({ message }) => {
        dispatch(addNotification({ type: NOTIFICATION_TYPES.ERROR, message }));
      });

    navigate(PRIVATE_ROUTES.HOME);
  };

  const handleRefresh = () => {
    getOrders();
    getOffers(currentOrder);
  };

  return (
    <div className={classes.container}>
      <CancelOrderConfirmationModal
        isOpened={isConfirmationModalOpened}
        onCancel={closeConfirmationModal}
        onConfirm={handleCancelOrder}
        text={t('current_order_cancel_text')}
      />
      <div className={classes.block__description}>
        <h2 className={classes.description__title}>{t('current_order_title')}</h2>
        <div className={classes.line} />
        <p className={classes.description__text}>{`${source} - ${destination}`}</p>
      </div>
      <div className={classes.card__driver__container}>
        {offers.map((offer) => (
          <DriverCard key={offer.id} offer={offer} />
        ))}
      </div>
      {offers.length === 0 ? (
        <NotFoundData className={classes.not_found_data} text={t('current_order_not_found_data')} />
      ) : null}
      <Button
        size={BUTTON_SIZES.LARGE}
        color={BUTTON_COLORS.PRIMARY}
        onClick={openConfirmationModal}
        variant={BUTTON_VARIANTS.CONTAINED}
        className={classes.block__button}
      >
        {t('button.cancel_order')}
      </Button>
      <Refresh className={classes.refresh} onClick={handleRefresh} />
    </div>
  );
}

export default ClientCurrentOrder;
