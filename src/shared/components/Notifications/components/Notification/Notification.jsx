import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import classes from '../../notifications.module.css';

import { NotificationPropType } from './notification.proptypes';
import { notificationClasses } from './notification.constants';

function Notification({ notification, onDelete }) {
  const [isClickedClose, setIsClickedClose] = useState(false);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    timeoutIdRef.current = setTimeout(() => {
      onDelete(notification.id);
    }, 8000);

    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, [notification.id, onDelete]);

  const handleClose = (id) => {
    setIsClickedClose(true);

    setTimeout(() => {
      clearTimeout(timeoutIdRef.current);
      onDelete(id);
    }, 400);
  };

  return (
    <div
      className={`${classes.notification} ${notificationClasses[notification.type]} 
      ${isClickedClose ? classes.notification_closed : ''}`}
    >
      <p className={classes.notification__text}>{notification.message}</p>
      <button
        type="button"
        className={classes.notification__close}
        onClick={() => handleClose(notification.id)}
      >
        +
      </button>
    </div>
  );
}

Notification.propTypes = {
  notification: NotificationPropType.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Notification;
