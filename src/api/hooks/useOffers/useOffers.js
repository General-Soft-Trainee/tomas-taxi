import { useReducer, useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { t } from 'i18next';

import { API_ROUTES } from '../../../constants/api.constants';
import { addNotification } from '../../../slices/notifications.slice';
import { axiosService } from '../../../services/axios.service';
import { NOTIFICATION_TYPES } from '../../../shared/components/Notifications/components/Notification/notification.constants';

import { OFFERS_REQUEST_START, OFFERS_GET_SUCCESS } from './offers.action';

import { INITIAL_STATE } from './offers.constants';

import { offersReducer } from './offers.reducer';

export function useOffers() {
  const dispatch = useDispatch();
  const [{ offers, status }, dispatchOffers] = useReducer(offersReducer, INITIAL_STATE);

  const getOffers = useCallback(
    async (id = '') => {
      try {
        dispatchOffers(OFFERS_REQUEST_START);
        const { data: offersInfo } = await axiosService.get(API_ROUTES.OFFER, {
          params: {
            orderId: id
          }
        });
        dispatchOffers(OFFERS_GET_SUCCESS(offersInfo));
      } catch (error) {
        dispatch(
          addNotification({ type: NOTIFICATION_TYPES.ERROR, message: error.response.data.message })
        );
      }
    },
    [dispatch, dispatchOffers]
  );

  const createOffer = async (requestPayload) => {
    try {
      dispatchOffers(OFFERS_REQUEST_START);
      await axiosService.post(API_ROUTES.OFFER, requestPayload);
      dispatch(
        addNotification({
          type: NOTIFICATION_TYPES.SUCCESS,
          message: t('notifications_message.create_offer_success')
        })
      );
    } catch (error) {
      dispatch(
        addNotification({ type: NOTIFICATION_TYPES.ERROR, message: error.response.data.message })
      );
    }
  };

  const deleteOffer = async (id) => {
    try {
      dispatchOffers(OFFERS_REQUEST_START);
      await axiosService.delete(`${API_ROUTES.OFFER}/${id}`);
      dispatch(
        addNotification({
          type: NOTIFICATION_TYPES.SUCCESS,
          message: t('notifications_message.cancel_offer_success')
        })
      );
    } catch (error) {
      dispatch(
        addNotification({ type: NOTIFICATION_TYPES.ERROR, message: error.response.data.message })
      );
    }
  };

  return { offers, status, getOffers, createOffer, deleteOffer };
}
