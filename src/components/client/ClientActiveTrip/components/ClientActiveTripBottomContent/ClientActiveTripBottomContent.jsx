import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { tripsSelector } from '../../../../../slices/trips.slice';

import classes from './client-active-trip-bottom-content.module.css';

function ClientActiveTripBottomContent() {
  const { t } = useTranslation();
  const { activeTrip } = useSelector(tripsSelector);
  return (
    <div className={classes.info__item}>
      <p className={classes.info__title}>{t('active_trip.rating')}:</p>
      <div className={classes.item__info__block}>
        <p className={classes.info__text}>{activeTrip.driver.rating || '-'}</p>
      </div>
    </div>
  );
}

export default ClientActiveTripBottomContent;
