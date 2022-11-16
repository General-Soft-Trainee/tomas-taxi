import { useTranslation } from 'react-i18next';

import classes from './client-title.module.css';

function ClientTitle() {
  const { t } = useTranslation();
  return (
    <div className={classes.block__title}>
      <h2 className={classes.title}>{t('home_title')}</h2>
    </div>
  );
}

export default ClientTitle;
