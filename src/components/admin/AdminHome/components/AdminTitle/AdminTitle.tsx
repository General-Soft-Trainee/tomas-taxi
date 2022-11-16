import { useTranslation } from 'react-i18next';

import classes from './admin-title.module.css';

function AdminTitle() {
  const { t } = useTranslation();
  return (
    <div className={classes.block__title}>
      <h2 className={classes.title}>{t('admin_title')}</h2>
    </div>
  );
}

export default AdminTitle;
