import { useNavigate } from 'react-router-dom';

import { notificationTypes } from '../../../shared/components/Notifications/components/Notification/notification.constants';
import useNotifications from '../../../shared/hooks/useNotifications';
import useAppSpinner from '../../../shared/hooks/useAppSpinner';
import { axiosService } from '../../../services/axios.service';
<<<<<<< HEAD
import { ROUTES } from '../../../app.constants';
=======
import { ROUTES } from '../../../constants/app.constants';
import { API_ROUTES } from '../../../constants/api.constants';
>>>>>>> develop

export function useRegistration() {
  const navigate = useNavigate();
  const { showSpinner, closeSpinner } = useAppSpinner();
  const { showNotification } = useNotifications();
  const registerDriver = async (requestPayload) => {
    try {
      showSpinner();
      await axiosService.post(API_ROUTES.REGISTER, requestPayload);
      showNotification(
        'We sent the activation link to email address. Please activate your account.',
        notificationTypes.success
      );
      navigate(ROUTES.LOGIN);
    } catch (error) {
      showNotification(error.response.data.message, notificationTypes.error);
    } finally {
      closeSpinner();
    }
  };
  const registerClient = async (requestPayload) => {
    try {
      showSpinner();
      await axiosService.post(API_ROUTES.REGISTER, requestPayload);
      showNotification(
        'We sent the activation link to email address. Please activate your account.',
        notificationTypes.success
      );
      navigate(ROUTES.LOGIN);
    } catch (error) {
      showNotification(error.response.data.message, notificationTypes.error);
    } finally {
      closeSpinner();
    }
  };
  return { registerDriver, registerClient };
}
