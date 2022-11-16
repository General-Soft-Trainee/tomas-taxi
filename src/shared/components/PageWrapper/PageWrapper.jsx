import { useEffect } from 'react';

import PropTypes from 'prop-types';

import { useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../components/Header/Header';
import { PUBLIC_ROUTES } from '../../../constants/app.constants';

import { getUser, userSelector } from '../../../slices/user.slice';

import { getActiveTrip } from '../../../slices/trips.slice';

import { addNotification } from '../../../slices/notifications.slice';

import { NOTIFICATION_TYPES } from '../Notifications/components/Notification/notification.constants';

import { USER_ROLES } from '../../../constants/user-roles.constants';

import classes from './page-wrapper.module.css';

function PageWrapper({ children }) {
  const dispatch = useDispatch();
  const {
    userData: { role },
    isAuthenticated
  } = useSelector(userSelector);
  const { pathname } = useLocation();
  const isPrivatePage = !Object.values(PUBLIC_ROUTES).includes(pathname);

  useEffect(() => {
    if (isPrivatePage && isAuthenticated) {
      dispatch(getUser())
        .unwrap()
        .catch(({ message }) => {
          dispatch(addNotification({ type: NOTIFICATION_TYPES.ERROR, message }));
        });
    }
    if (isPrivatePage && isAuthenticated && role !== USER_ROLES.ADMIN && role !== '') {
      dispatch(getActiveTrip())
        .unwrap()
        .catch(({ message }) => {
          dispatch(addNotification({ type: NOTIFICATION_TYPES.ERROR, message }));
        });
    }
  }, [dispatch, isAuthenticated, isPrivatePage, role]);

  return (
    <div className={classes.wrapper}>
      <Header isPrivatePage={isPrivatePage} />
      <div className={classes.container}>{children}</div>
    </div>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageWrapper;
