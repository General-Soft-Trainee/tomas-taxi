import { useTranslation } from 'react-i18next';

import ClientActions from '../ClientActions/ClientActions';

import classes from './client-content.module.css';

function ClientContent() {
  const { t } = useTranslation();
  return (
    <>
      <div className={classes.block__text}>
        <p className={classes.text}>{t('home_content_text')}</p>
      </div>
      <div className={classes.block__qualities}>
        <p className={classes.qualities__text}>{t('characteristics.ch1')}</p>
        <div className={classes.qualities__circle} />
        <p className={classes.qualities__text}>{t('characteristics.ch2')}</p>
        <div className={classes.qualities__circle} />
        <p className={classes.qualities__text}>{t('characteristics.ch3')}</p>
      </div>
      <ClientActions />
    </>
  );
}

export default ClientContent;
