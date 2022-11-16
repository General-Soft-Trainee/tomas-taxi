import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_VARIANTS
} from '../../../../../shared/components/Button/button.constants';

import { useModal } from '../../../../../shared/hooks/useModal';

import { OrderObjectPropType } from '../../../../../shared/prop-types';

import Button from '../../../../../shared/components/Button/Button';

import CancelOfferConfirmationModal from './components/CancelOfferConfirmationModal/CancelOfferConfirmationModal';
import classes from './cancel-offer.module.css';

function CancelOffer({ order, offerId, getOffers }) {
  const { t } = useTranslation();
  const {
    isModalOpened: isConfirmationModalOpened,
    openModal: openConfirmationModal,
    closeModal: closeConfirmationModal
  } = useModal();
  return (
    <>
      <CancelOfferConfirmationModal
        isOpened={isConfirmationModalOpened}
        onCancel={closeConfirmationModal}
        order={order}
        offerId={offerId}
        getOffers={getOffers}
      />
      <Button
        color={BUTTON_COLORS.ERROR}
        size={BUTTON_SIZES.SMALL}
        variant={BUTTON_VARIANTS.CONTAINED}
        className={classes.button__offer}
        onClick={openConfirmationModal}
      >
        {t('button.cancel')}
      </Button>
    </>
  );
}

CancelOffer.propTypes = {
  order: OrderObjectPropType.isRequired,
  offerId: PropTypes.string.isRequired,
  getOffers: PropTypes.func.isRequired
};

export default CancelOffer;
