import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';

import { useTranslation } from 'react-i18next';

import Modal from '../../../../../../../shared/components/Modal/Modal';
import { MODAL_SIZE } from '../../../../../../../shared/components/Modal/modal.constants';
import FormInput from '../../../../../../../shared/components/form-elements/FormInput/FormInput';

import { INPUT_TYPES } from '../../../../../../../shared/components/form-elements/FormInput/form-input.constants';

import { OPTIONS_VALIDATE } from '../../../../../../helpers/OPTIONS_VALIDATE';

import Button from '../../../../../../../shared/components/Button/Button';

import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_TYPES,
  BUTTON_VARIANTS
} from '../../../../../../../shared/components/Button/button.constants';

import { useOffers } from '../../../../../../../api/hooks/useOffers/useOffers';

import { OrderObjectPropType } from '../../../../../../../shared/prop-types';

import { REQUEST_STATUS } from '../../../../../../../constants/app.constants';

import ProgressSpinner from '../../../../../../../shared/components/ProgressSpinner/ProgressSpinner';

import classes from './create-offer-modal.module.css';

function CreateOfferModal({ isOpened, closeModal, order, getOffers }) {
  const { t } = useTranslation();
  const { createOffer, status } = useOffers();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isValid }
  } = useForm({ defaultValues: { price: '' }, mode: 'onTouched' });

  const onSubmit = async () => {
    closeModal();
    await createOffer({ orderId: order.id, price: watch('price') });
    await getOffers();
    reset({ price: '' });
  };

  if (status === REQUEST_STATUS.LOADING) {
    return <ProgressSpinner isShow />;
  }
  return (
    <Modal isOpened={isOpened} closeModal={closeModal} size={MODAL_SIZE.MEDIUM}>
      <div className={classes.modal__content}>
        <div className={classes.modal__item}>
          <h5 className={classes.modal__title}>{t('order_row.who')}:</h5>
          <p
            className={classes.modal__text}
          >{`${order.client.firstName} ${order.client.lastName}`}</p>
        </div>
        <div className={classes.modal__item}>
          <h5 className={classes.modal__title}>{t('order_row.from')}:</h5>
          <p className={classes.modal__text}>{order.source}</p>
        </div>
        <div className={classes.modal__item}>
          <h5 className={classes.modal__title}>{t('order_row.to')}:</h5>
          <p className={classes.modal__text}>{order.destination}</p>
        </div>
        <p className={classes.offer__text}>{t('create_offer_modal_text')}</p>
        <form className={classes.modal__form} onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            type={INPUT_TYPES.NUMBER}
            name="price"
            placeholder="Price"
            control={control}
            error={errors.price}
            rules={OPTIONS_VALIDATE.PRICE}
          />
          <div className={classes.modal__actions}>
            <Button
              size={BUTTON_SIZES.SMALL}
              color={BUTTON_COLORS.ERROR}
              variant={BUTTON_VARIANTS.CONTAINED}
              type={BUTTON_TYPES.BUTTON}
              onClick={closeModal}
            >
              {t('button.cancel')}
            </Button>
            <Button
              type={BUTTON_TYPES.SUBMIT}
              size={BUTTON_SIZES.SMALL}
              color={BUTTON_COLORS.SUCCESS}
              variant={BUTTON_VARIANTS.CONTAINED}
              className={classes.modal__button}
              disabled={!isValid}
            >
              {t('button.ok')}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

CreateOfferModal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  getOffers: PropTypes.func.isRequired,
  order: OrderObjectPropType
};

CreateOfferModal.defaultProps = {
  order: {}
};

export default CreateOfferModal;
