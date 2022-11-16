import PropTypes from 'prop-types';

import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { PRIVATE_ROUTES, REQUEST_STATUS } from '../../constants/app.constants';

import ProgressSpinner from '../../shared/components/ProgressSpinner/ProgressSpinner';

import { tripsSelector } from '../../slices/trips.slice';

import classes from './active-trip.module.css';

function ActiveTrip({ bottomContent, bottomActions }) {
  const { t } = useTranslation();
  const { activeTrip, status } = useSelector(tripsSelector);

  if (status === REQUEST_STATUS.LOADING) {
    return <ProgressSpinner isShow />;
  }

  if (Object.keys(activeTrip).length === 0) {
    return <Navigate to={PRIVATE_ROUTES.HOME} />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.block__title}>
        <h2 className={classes.title}>{t('active_trip.title')}</h2>
      </div>
      <div className={classes.line} />
      <div className={classes.treep__wrapper}>
        <div className={classes.treep__container}>
          <div className={classes.treep__content}>
            <img className={classes.car__img} src={activeTrip.driver.car.photo} alt="Car" />
            <div className={classes.block__info}>
              <div className={classes.info__item}>
                <p className={classes.info__title}>{t('active_trip.from')}:</p>
                <div className={classes.item__info__block}>
                  <p className={classes.info__text}>{activeTrip.source}</p>
                </div>
              </div>
              <div className={classes.info__item}>
                <p className={classes.info__title}>{t('active_trip.to')}:</p>
                <div className={classes.item__info__block}>
                  <p className={classes.info__text}>{activeTrip.destination}</p>
                </div>
              </div>
              <div style={{ marginTop: '50px' }}>
                <div className={classes.info__item}>
                  <p className={classes.info__title}>{t('active_trip.price')}:</p>
                  <div className={classes.item__info__block}>
                    <p className={classes.info__text}>${activeTrip.price}</p>
                  </div>
                </div>
                <div className={classes.info__item}>
                  <p className={classes.info__title}>{t('active_trip.driver')}:</p>
                  <div className={classes.item__info__block}>
                    <p className={classes.info__text}>
                      {activeTrip.driver.firstName} {activeTrip.driver.lastName}
                    </p>
                  </div>
                </div>
                <div className={classes.info__item}>
                  <p className={classes.info__title}>{t('active_trip.car')}:</p>
                  <div className={classes.item__info__block}>
                    <p className={classes.info__text}>
                      {activeTrip.driver.car.color} {activeTrip.driver.car.make}{' '}
                      {activeTrip.driver.car.model} {activeTrip.driver.car.year}
                    </p>
                  </div>
                </div>
                {bottomContent}
              </div>
            </div>
          </div>
          {bottomActions}
        </div>
      </div>
    </div>
  );
}

ActiveTrip.propTypes = {
  bottomContent: PropTypes.node,
  bottomActions: PropTypes.node
};

ActiveTrip.defaultProps = {
  bottomContent: null,
  bottomActions: null
};

export default ActiveTrip;
