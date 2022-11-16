import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Button from '../../../../../shared/components/Button/Button';
import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_VARIANTS
} from '../../../../../shared/components/Button/button.constants';
import { useModal } from '../../../../../shared/hooks/useModal';
import { OrderObjectPropType } from '../../../../../shared/prop-types';

import CreateOfferModal from './components/CreateOfferModal/CreateOfferModal';

import classes from './create-offer.module.css';

function CreateOffer({ order, getOffers }) {
  const { t } = useTranslation();
  const { isModalOpened, openModal, closeModal } = useModal();
  return (
    <>
      <CreateOfferModal
        isOpened={isModalOpened}
        closeModal={closeModal}
        order={order}
        getOffers={getOffers}
      />
      <Button
        color={BUTTON_COLORS.SUCCESS}
        size={BUTTON_SIZES.SMALL}
        variant={BUTTON_VARIANTS.CONTAINED}
        className={classes.button__offer}
        onClick={openModal}
      >
        {t('button.offer')}
      </Button>
    </>
  );
}

CreateOffer.propTypes = {
  order: OrderObjectPropType.isRequired,
  getOffers: PropTypes.func.isRequired
};

export default CreateOffer;
