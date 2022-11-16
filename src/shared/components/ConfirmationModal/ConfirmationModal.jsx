import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import { MODAL_SIZE } from '../Modal/modal.constants';
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS } from '../Button/button.constants';

import classes from './confirmation-modal.module.css';

function ConfirmationModal({ isOpened, text, onCancel, onConfirm }) {
  const { t } = useTranslation();
  return (
    <Modal isOpened={isOpened} size={MODAL_SIZE.LARGE} hasCloseIcon={false} closeModal={onCancel}>
      <div>
        <p className={classes.confirmation__text}>{text}</p>
        <div className={classes.confirmation__buttons}>
          <Button
            size={BUTTON_SIZES.MEDIUM}
            color={BUTTON_COLORS.ERROR}
            variant={BUTTON_VARIANTS.CONTAINED}
            className={classes.button}
            onClick={onCancel}
          >
            {t('button.cancel')}
          </Button>
          <Button
            size={BUTTON_SIZES.MEDIUM}
            color={BUTTON_COLORS.SUCCESS}
            variant={BUTTON_VARIANTS.CONTAINED}
            onClick={onConfirm}
          >
            {t('button.ok')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  text: PropTypes.string.isRequired,
  isOpened: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
};

ConfirmationModal.defaultProps = {
  // eslint-disable-next-line prettier/prettier
  onCancel: () => { },
  // eslint-disable-next-line prettier/prettier
  onConfirm: () => { }
};

export default ConfirmationModal;
