import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import {
  PAGINATION_VARIANTS_NUMBERS,
  REQUEST_STATUS,
  START_BOUNDARY_COUNT,
  START_ITEM_PAGE,
  START_PAGE,
  START_SUBLING_COUNT
} from '../../constants/app.constants';
import ProgressSpinner from '../../shared/components/ProgressSpinner/ProgressSpinner';

import { getTrips, tripsSelector } from '../../slices/trips.slice';
import DropDown from '../../shared/components/DropDown/DropDown';

import { calculatePagesCount } from '../helpers/helpers';

import { addNotification } from '../../slices/notifications.slice';
import { NOTIFICATION_TYPES } from '../../shared/components/Notifications/components/Notification/notification.constants';

import NotFoundData from '../../shared/components/NotFoundData/NotFoundData';

import classes from './orders-history.module.css';

function OrdersHistory({ renderTable }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    inactiveTrips: { items = [], total },
    status
  } = useSelector(tripsSelector);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(START_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(START_ITEM_PAGE);

  useEffect(() => {
    setCount(calculatePagesCount(total, rowsPerPage));
  }, [rowsPerPage, total]);

  useEffect(() => {
    dispatch(getTrips({ page: page - START_PAGE, size: rowsPerPage }))
      .unwrap()
      .catch(({ message }) =>
        dispatch(addNotification({ type: NOTIFICATION_TYPES.ERROR, message }))
      );
  }, [dispatch, page, rowsPerPage]);

  if (status === REQUEST_STATUS.LOADING) {
    return <ProgressSpinner isShow />;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (item) => {
    setRowsPerPage(item.value);
    setPage(START_PAGE);
  };

  return (
    <div className={classes.container}>
      <div className={classes.block__title}>
        <h2 className={classes.title}>{t('orders_history_title')}</h2>
      </div>
      <div className={classes.line} />
      {total !== 0 ? (
        <div className={classes.dropdown__block}>
          <div className={classes.dropdown__title}>{t('items_per_page')}</div>
          <DropDown
            value={rowsPerPage}
            onListItemClick={handleChangeRowsPerPage}
            items={PAGINATION_VARIANTS_NUMBERS}
          />
        </div>
      ) : null}
      {total === 0 ? <NotFoundData text="You don't have any trips yet" /> : renderTable(items)}
      {total !== 0 ? (
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
      ) : null}
    </div>
  );
}

OrdersHistory.propTypes = {
  renderTable: PropTypes.func.isRequired
};

export default OrdersHistory;
