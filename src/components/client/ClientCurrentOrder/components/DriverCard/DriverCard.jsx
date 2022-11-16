import { useNavigate } from 'react-router-dom';

import { Card } from '@mui/material';

import { useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import Button from '../../../../../shared/components/Button/Button';
import {
  BUTTON_VARIANTS,
  BUTTON_COLORS,
  BUTTON_SIZES
} from '../../../../../shared/components/Button/button.constants';

import { PRIVATE_ROUTES } from '../../../../../constants/app.constants';

import { useModal } from '../../../../../shared/hooks/useModal';

import AcceptOfferConfirmationModal from '../../../../../shared/components/ConfirmationModal/ConfirmationModal';

import { OfferObjectPropType } from '../../../../../shared/prop-types';

import { getActiveTrip, createTrip } from '../../../../../slices/trips.slice';
import DriverCarInfoModal from '../../../../DriverCarInfoModal/DriverCarInfoModal';

import { addNotification } from '../../../../../slices/notifications.slice';

import { NOTIFICATION_TYPES } from '../../../../../shared/components/Notifications/components/Notification/notification.constants';

import classes from './driver-card.module.css';

import RatingAndPrice from './components/RatingAndPrice/RatingAndPrice';

import { RATING_AND_PRICE_SIZES } from './components/RatingAndPrice/rating-and-price.constants';

function DriverCard({ offer }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isModalOpened, openModal, closeModal } = useModal();
  const {
    isModalOpened: isAcceptOfferConfirmationModalOpened,
    openModal: openAcceptOfferConfirmationModal,
    closeModal: closeAcceptOfferConfirmationModal
  } = useModal();
  const navigate = useNavigate();

  const handleAcceptOfferClick = (e) => {
    e.stopPropagation();
    openAcceptOfferConfirmationModal();
  };

  const handleSubmitOffer = async (id) => {
    closeModal();
    closeAcceptOfferConfirmationModal();
    await dispatch(createTrip({ offerId: id }))
      .unwrap()
      .catch(({ message }) => {
        dispatch(addNotification({ type: NOTIFICATION_TYPES.ERROR, message }));
      });
    await dispatch(getActiveTrip())
      .unwrap()
      .catch(({ message }) => {
        dispatch(addNotification({ type: NOTIFICATION_TYPES.ERROR, message }));
      });

    navigate(PRIVATE_ROUTES.TRIP);
  };

  return (
    <Card>
      <AcceptOfferConfirmationModal
        isOpened={isAcceptOfferConfirmationModalOpened}
        onCancel={closeAcceptOfferConfirmationModal}
        onConfirm={() => handleSubmitOffer(offer.id)}
        text={`${t('accept_offer_text')} ${offer.driver.firstName} ${offer.driver.lastName}?`}
      />
      <DriverCarInfoModal
        isOpened={isModalOpened}
        closeModal={closeModal}
        onClick={openAcceptOfferConfirmationModal}
        info={offer}
        car={offer.driver.car}
      />
      <div className={classes.card__container} role="button" tabIndex="0" onClick={openModal}>
        <img className={classes.img} src={offer.driver.car.photo} alt="Car" />
        <h3 className={classes.card__title_car}>
          {offer.driver.car.make} {offer.driver.car.model}
        </h3>
        <h3 className={classes.card__title_user}>
          {offer.driver.firstName} {offer.driver.lastName}
        </h3>
        <RatingAndPrice
          rating={offer.driver.rating}
          price={offer.price}
          size={RATING_AND_PRICE_SIZES.SMALL}
        />
        <Button
          color={BUTTON_COLORS.SUCCESS}
          variant={BUTTON_VARIANTS.CONTAINED}
          size={BUTTON_SIZES.EXTRA_SMALL}
          className={classes.block__button}
          onClick={handleAcceptOfferClick}
        >
          {t('button.accept')}
        </Button>
      </div>
    </Card>
  );
}

DriverCard.propTypes = {
  offer: OfferObjectPropType.isRequired
};

export default DriverCard;
