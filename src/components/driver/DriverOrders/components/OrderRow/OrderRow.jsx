import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { OrderObjectPropType } from '../../../../../shared/prop-types';

import classes from './order-row.module.css';

function OrderRow({ order, offerId, renderButton }) {
  const { t } = useTranslation();
  return (
    <div className={classes.driver__order}>
      <h4 className={classes.order__title}>{t('order_row.who')}:</h4>
      <p className={classes.order__text}>{`${order.client.firstName} ${order.client.lastName}`}</p>
      <h4 className={classes.order__title}>{t('order_row.from')}:</h4>
      <p className={classes.order__text}>{order.source}</p>
      <h4 className={classes.order__title}>{t('order_row.to')}:</h4>
      <p className={classes.order__text}>{order.destination}</p>
      {renderButton(order, offerId)}
    </div>
  );
}

OrderRow.propTypes = {
  order: OrderObjectPropType,
  offerId: PropTypes.string,
  renderButton: PropTypes.func.isRequired
};

OrderRow.defaultProps = {
  order: {},
  offerId: null
};

export default OrderRow;
