import { useTranslation } from 'react-i18next';

import { PRIVATE_ROUTES } from '../../../../../constants/app.constants';
import Button from '../../../../../shared/components/Button/Button';
import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_TYPES,
  BUTTON_VARIANTS
} from '../../../../../shared/components/Button/button.constants';

import Link from '../../../../../shared/components/Link/Link';

import classes from './driver-actions.module.css';

function DriverActions() {
  const { t } = useTranslation();
  return (
    <div className={classes.block__buttons}>
      <Link to={PRIVATE_ROUTES.DRIVER_ORDERS}>
        <Button
          size={BUTTON_SIZES.LARGE}
          color={BUTTON_COLORS.PRIMARY}
          variant={BUTTON_VARIANTS.CONTAINED}
          type={BUTTON_TYPES.BUTTON}
          className={classes.button}
        >
          {t('button.start_treep')}
        </Button>
      </Link>
      <Link to={PRIVATE_ROUTES.ORDERS_HISTORY}>
        <Button
          size={BUTTON_SIZES.LARGE}
          color={BUTTON_COLORS.PRIMARY}
          variant={BUTTON_VARIANTS.CONTAINED}
          type={BUTTON_TYPES.BUTTON}
        >
          {t('button.view_history')}
        </Button>
      </Link>
    </div>
  );
}

export default DriverActions;
