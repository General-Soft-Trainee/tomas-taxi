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

import classes from './admin-actions.module.css';

function AdminActions() {
  const { t } = useTranslation();
  return (
    <div className={classes.block__buttons}>
      <Link to={PRIVATE_ROUTES.REPORTS}>
        <Button
          size={BUTTON_SIZES.LARGE}
          color={BUTTON_COLORS.PRIMARY}
          variant={BUTTON_VARIANTS.CONTAINED}
          type={BUTTON_TYPES.BUTTON}
          className={classes.button}
        >
          {t('button.reports')}
        </Button>
      </Link>
      <Link to={PRIVATE_ROUTES.USERS_CLIENTS}>
        <Button
          size={BUTTON_SIZES.LARGE}
          color={BUTTON_COLORS.PRIMARY}
          variant={BUTTON_VARIANTS.CONTAINED}
          type={BUTTON_TYPES.BUTTON}
        >
          {t('button.all_users')}
        </Button>
      </Link>
    </div>
  );
}

export default AdminActions;
