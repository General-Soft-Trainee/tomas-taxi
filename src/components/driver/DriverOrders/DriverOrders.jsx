import { useEffect } from 'react';

import { useOffers } from '../../../api/hooks/useOffers/useOffers';
import { useOrders } from '../../../api/hooks/useOrders/useOrders';
import { REQUEST_STATUS } from '../../../constants/app.constants';
import ProgressSpinner from '../../../shared/components/ProgressSpinner/ProgressSpinner';
import Refresh from '../../../shared/components/Refresh/Refresh';

import { getOfferId } from '../../helpers/helpers';

import OrderRow from './components/OrderRow/OrderRow';
import classes from './driver-orders.module.css';

import CancelOffer from './components/CancelOffer/CancelOffer';
import CreateOffer from './components/CreateOffer/CreateOffer';

function DriverOrders() {
  const { getOffers, offers, status: offerRequestStatus } = useOffers();
  const { getOrders, orders, status: orderRequestStatus } = useOrders();

  const renderButtonCallback = (order, offerId) => {
    return offerId ? (
      <CancelOffer order={order} offerId={offerId} getOffers={getOffers} />
    ) : (
      <CreateOffer order={order} getOffers={getOffers} />
    );
  };

  useEffect(() => {
    getOffers();
    getOrders();
  }, [getOffers, getOrders]);

  const handleRefresh = () => {
    getOffers();
    getOrders();
  };

  if (
    orderRequestStatus === REQUEST_STATUS.LOADING &&
    offerRequestStatus === REQUEST_STATUS.LOADING
  ) {
    return <ProgressSpinner isShow />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.block__title}>
        <h2 className={classes.title}>Orders</h2>
      </div>
      <div className={classes.line} />
      <div className={classes.driver__orders}>
        {orders.map((order) => (
          <OrderRow
            key={order.id}
            order={order}
            getOffers={getOffers}
            offerId={getOfferId(offers, order.id)}
            renderButton={renderButtonCallback}
          />
        ))}
      </div>
      <Refresh className={classes.refresh} onClick={handleRefresh} />
    </div>
  );
}

export default DriverOrders;
