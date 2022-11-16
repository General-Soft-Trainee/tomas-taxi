import { useState } from 'react';

import { capitalize } from '@mui/material';

import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { userBlocked } from '../../../../../../../../../api/hooks/useUsers/users.actions';
import { REQUEST_STATUS } from '../../../../../../../../../constants/app.constants';
import Button from '../../../../../../../../../shared/components/Button/Button';
import {
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  BUTTON_COLORS
} from '../../../../../../../../../shared/components/Button/button.constants';
import ConfirmationModal from '../../../../../../../../../shared/components/ConfirmationModal/ConfirmationModal';
import { NOTIFICATION_TYPES } from '../../../../../../../../../shared/components/Notifications/components/Notification/notification.constants';
import ProgressSpinner from '../../../../../../../../../shared/components/ProgressSpinner/ProgressSpinner';
import { useModal } from '../../../../../../../../../shared/hooks/useModal';
import { addNotification } from '../../../../../../../../../slices/notifications.slice';
import { userSelector } from '../../../../../../../../../slices/user.slice';
import { useAppDispatch } from '../../../../../../../../../store';

import { BlockPermanentlyProps } from './block-permanently.types';

function BlockPermanently({ userInfo, closeAdminBlockModal, getUsers }: BlockPermanentlyProps) {
  const { t } = useTranslation();
  const { isModalOpened, openModal, closeModal } = useModal();
  const dispatch = useAppDispatch();
  const { status } = useSelector(userSelector);

  const handleBlockPermanentlyAccept = () => {
    dispatch(userBlocked({ blocked: true, userId: userInfo.id }))
      .unwrap()
      .then(async () => {
        await getUsers();
        closeAdminBlockModal();
        dispatch(
          addNotification({
            type: NOTIFICATION_TYPES.SUCCESS,
            message: `${capitalize(userInfo.role)} ${t('notifications_message.block_success')}`
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
        onConfirm={handleBlockPermanentlyAccept}
        text={`Are you sure you want to block ${userInfo.firstName} ${userInfo.lastName} permanently?`}
      />
      <Button
        variant={BUTTON_VARIANTS.CONTAINED}
        size={BUTTON_SIZES.MEDIUM_LONG}
        color={BUTTON_COLORS.ERROR}
        onClick={openModal}
      >
        {t('button.block_permanently')}
      </Button>
    </>
  );
}

export default BlockPermanently;
