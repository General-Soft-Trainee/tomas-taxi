import { useTranslation } from 'react-i18next';

import Button from '../../../../../shared/components/Button/Button';
import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_TYPES,
  BUTTON_VARIANTS
} from '../../../../../shared/components/Button/button.constants';
import { useModal } from '../../../../../shared/hooks/useModal';
import RateDriverModal from '../RateDriverModal/RateDriverModal';

import classes from './client-active-trip-actions.module.css';

function ClientActiveTripActions() {
  const { t } = useTranslation();
  const { isModalOpened, openModal, closeModal } = useModal();
  return (
    <>
      <RateDriverModal isOpened={isModalOpened} closeModal={closeModal} />
      <Button
        variant={BUTTON_VARIANTS.CONTAINED}
        color={BUTTON_COLORS.SECONDARY}
        type={BUTTON_TYPES.BUTTON}
        size={BUTTON_SIZES.MEDIUM_LONG}
        className={classes.treep__button}
        onClick={openModal}
      >
        {t('button.finish_treep')}
      </Button>
    </>
  );
}

export default ClientActiveTripActions;
