import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { Pagination } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import {
  PAGINATION_VARIANTS_NUMBERS,
  PRIVATE_ROUTES,
  PUBLIC_ROUTES,
  REQUEST_STATUS,
  START_BOUNDARY_COUNT,
  START_ITEM_PAGE,
  START_PAGE,
  START_SUBLING_COUNT
} from '../../../constants/app.constants';
import DropDown from '../../../shared/components/DropDown/DropDown';
import Link from '../../../shared/components/Link/Link';

import ProgressSpinner from '../../../shared/components/ProgressSpinner/ProgressSpinner';

import { userSelector } from '../../../slices/user.slice';

import { NOTIFICATION_TYPES } from '../../../shared/components/Notifications/components/Notification/notification.constants';

import { addNotification } from '../../../slices/notifications.slice';

import { USER_ROLES } from '../../../constants/user-roles.constants';

import { getUsers } from '../../../api/hooks/useUsers/users.actions';

import { calculatePagesCount } from '../../helpers/helpers';

import { DropDownItem } from '../../../shared/components/DropDown/drop-down.types';

import { useAppDispatch } from '../../../store';

import classes from './admin-users.module.css';
import { AdminUsersProps } from './admin-users.types';

function AdminUsers({ renderTable }: AdminUsersProps) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [status, setStatus] = useState(REQUEST_STATUS.IDLE);
  const dispatch = useAppDispatch();
  const {
    users: { items = [], total = 0 },
    isAuthenticated
  } = useSelector(userSelector);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(START_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(START_ITEM_PAGE);
  const isPrivatePage = !Object.values(PUBLIC_ROUTES).includes(pathname);

  const getUsersCallback = useCallback(() => {
    dispatch(
      getUsers({
        page: page - START_PAGE,
        size: rowsPerPage,
        role: pathname === PRIVATE_ROUTES.USERS_CLIENTS ? USER_ROLES.CLIENT : USER_ROLES.DRIVER
      })
    )
      .unwrap()
      .then(() => setStatus(REQUEST_STATUS.SUCCESS))
      .catch(({ message }) => {
        setStatus(REQUEST_STATUS.FAILED);
        dispatch(addNotification({ type: NOTIFICATION_TYPES.ERROR, message }));
      });
  }, [dispatch, page, pathname, rowsPerPage]);

  useEffect(() => {
    setCount(calculatePagesCount(total, rowsPerPage));
  }, [rowsPerPage, total]);

  useEffect(() => {
    if (isAuthenticated && isPrivatePage) {
      setStatus(REQUEST_STATUS.LOADING);
      getUsersCallback();
    }
  }, [dispatch, getUsersCallback, isAuthenticated, isPrivatePage, page, pathname, rowsPerPage]);

  if (status === REQUEST_STATUS.LOADING) {
    return <ProgressSpinner isShow />;
  }

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (item: DropDownItem) => {
    setRowsPerPage(item.value);
    setPage(START_PAGE);
  };

  return (
    <div className={classes.container}>
      <div className={classes.block__title}>
        <div
          className={
            pathname === PRIVATE_ROUTES.USERS_CLIENTS
              ? `${classes.title__item} ${classes.title__item_active}`
              : classes.title__item
          }
        >
          <Link to={PRIVATE_ROUTES.USERS_CLIENTS}>
            <h2 className={classes.title}>{t('users_title.clients')}</h2>
          </Link>
        </div>
        <div
          className={
            pathname === PRIVATE_ROUTES.USERS_DRIVERS
              ? `${classes.title__item} ${classes.title__item_active}`
              : classes.title__item
          }
        >
          <Link to={PRIVATE_ROUTES.USERS_DRIVERS}>
            <h2 className={classes.title}>{t('users_title.drivers')}</h2>
          </Link>
        </div>
      </div>
      <div className={classes.dropdown__block}>
        <div className={classes.dropdown__title}>{t('items_per_page')}</div>
        <DropDown
          value={rowsPerPage}
          onListItemClick={handleChangeRowsPerPage}
          items={PAGINATION_VARIANTS_NUMBERS}
        />
      </div>
      {renderTable(items, getUsersCallback)}
      <div className={classes.pagination__block}>
        <Pagination
          count={count}
          size="large"
          page={page}
          onChange={handleChangePage}
          color="secondary"
          hidePrevButton
          hideNextButton
          siblingCount={START_SUBLING_COUNT}
          boundaryCount={START_BOUNDARY_COUNT}
        />
      </div>
    </div>
  );
}

export default AdminUsers;
