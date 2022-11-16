import { useTranslation } from 'react-i18next';

import DriverActions from '../DriverActions/DriverActions';

import classes from './driver-content.module.css';

function DriverContent() {
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
      <DriverActions />
    </>
  );
}

export default DriverContent;
