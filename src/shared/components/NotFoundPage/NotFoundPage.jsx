import { useTranslation } from 'react-i18next';

import { PRIVATE_ROUTES } from '../../../constants/app.constants';
import Button from '../Button/Button';
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_VARIANTS } from '../Button/button.constants';
import Link from '../Link/Link';

import classes from './not-found-page.module.css';

function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className={classes.notfound__container}>
      <h1 className={classes.notfound__title}>{t('not_found_page')}</h1>
      <Link to={PRIVATE_ROUTES.HOME}>
        <Button
          size={BUTTON_SIZES.LARGE}
          color={BUTTON_COLORS.PRIMARY}
          variant={BUTTON_VARIANTS.CONTAINED}
        >
          {t('button.go_home')}
        </Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
