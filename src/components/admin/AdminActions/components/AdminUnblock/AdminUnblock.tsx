import { useSelector } from 'react-redux';
import { capitalize } from '@mui/material';

import { useTranslation } from 'react-i18next';

import { userBlocked } from '../../../../../api/hooks/useUsers/users.actions';
import { REQUEST_STATUS } from '../../../../../constants/app.constants';

import Button from '../../../../../shared/components/Button/Button';
import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_VARIANTS
} from '../../../../../shared/components/Button/button.constants';
import ConfirmationModal from '../../../../../shared/components/ConfirmationModal/ConfirmationModal';
import { NOTIFICATION_TYPES } from '../../../../../shared/components/Notifications/components/Notification/notification.constants';
import ProgressSpinner from '../../../../../shared/components/ProgressSpinner/ProgressSpinner';

import { useModal } from '../../../../../shared/hooks/useModal';
import { addNotification } from '../../../../../slices/notifications.slice';
import { userSelector } from '../../../../../slices/user.slice';
import { useAppDispatch } from '../../../../../store';

import { AdminUnblockProps } from './admin-unblock.types';

function AdminUnblock({ userInfo, getUsers }: AdminUnblockProps) {
  const { t } = useTranslation();
  const { isModalOpened, openModal, closeModal } = useModal();
  const { status } = useSelector(userSelector);
  const dispatch = useAppDispatch();

  const handleUnblockAccept = () => {
    dispatch(userBlocked({ blocked: false, userId: userInfo.id }))
      .unwrap()
      .then(async () => {
        await getUsers();
        closeModal();
        dispatch(
          addNotification({
            type: NOTIFICATION_TYPES.SUCCESS,
            message: `${capitalize(userInfo.role)} ${t('notifications_message.unblock_success')}`
          })
        );
      })
      .catch(({ message }) =>
        dispatch(
          addNotification({
            type: NOTIFICATION_TYPES.ERROR,
            message
          })
        )
      );
  };

  if (status === REQUEST_STATUS.LOADING) {
    return <ProgressSpinner isShow />;
  }

  return (
    <>
      <ConfirmationModal
        isOpened={isModalOpened}
        onCancel={closeModal}
        onConfirm={handleUnblockAccept}
        text={`${t('unblock_text')} ${userInfo.firstName} ${userInfo.lastName}`}
      />
      <Button
        variant={BUTTON_VARIANTS.CONTAINED}
        size={BUTTON_SIZES.EXTRA_SMALL}
        color={BUTTON_COLORS.SUCCESS}
        onClick={openModal}
      >
        {t('button.unblock')}
      </Button>
    </>
  );
}

export default AdminUnblock;
