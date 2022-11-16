import { useState } from 'react';

import moment from 'moment';
import { capitalize, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { useTranslation } from 'react-i18next';

import Button from '../../../../../../../shared/components/Button/Button';
import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_VARIANTS
} from '../../../../../../../shared/components/Button/button.constants';

import Modal from '../../../../../../../shared/components/Modal/Modal';
import { MODAL_SIZE } from '../../../../../../../shared/components/Modal/modal.constants';

import ConfirmationModal from '../../../../../../../shared/components/ConfirmationModal/ConfirmationModal';

import { useModal } from '../../../../../../../shared/hooks/useModal';

import { useAppDispatch } from '../../../../../../../store';

import { userBlocked } from '../../../../../../../api/hooks/useUsers/users.actions';

import { addNotification } from '../../../../../../../slices/notifications.slice';

import { NOTIFICATION_TYPES } from '../../../../../../../shared/components/Notifications/components/Notification/notification.constants';

import BlockPermanently from './components/BlockPermanently/BlockPermanently';
import classes from './admin-block-modal.module.css';
import { AdminBlockModalProps } from './admin-block-modal.types';

function AdminBlockModal({
  isOpened,
  closeModal,
  title,
  userInfo,
  getUsers
}: AdminBlockModalProps) {
  const { t } = useTranslation();
  const {
    isModalOpened: isConfirmationModalOpened,
    openModal: openConfirmationModal,
    closeModal: closeConfirmationModal
  } = useModal();
  const [isBlockUntil, setIsBlockUntil] = useState(false);
  const [dateTimePickerValue, setDateTimePickerValue] = useState(null);
  const dispatch = useAppDispatch();

  const handleOpenBlockUntil = () => {
    setIsBlockUntil(true);
  };

  const handleCloseBlockUntil = () => {
    setIsBlockUntil(false);
  };

  const handleDateTimePickerRef = () => {
    document.querySelector('input')?.setAttribute('disabled', 'true');
  };

  const handleBlockUntilAccept = () => {
    dispatch(
      userBlocked({
        blocked: true,
        blockedUntil: Date.parse(String(dateTimePickerValue)),
        userId: userInfo.id
      })
    )
      .unwrap()
      .then(async () => {
        await getUsers();
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

  return (
    <Modal isOpened={isOpened} closeModal={closeModal} size={MODAL_SIZE.LARGE}>
      <div className={classes.modal__content}>
        <h2 className={classes.modal__title}>{title}</h2>
        {isBlockUntil || (
          <div className={classes.modal__actions}>
            <BlockPermanently
              getUsers={getUsers}
              closeAdminBlockModal={closeModal}
              userInfo={userInfo}
            />
            <Button
              variant={BUTTON_VARIANTS.CONTAINED}
              size={BUTTON_SIZES.MEDIUM_LONG}
              color={BUTTON_COLORS.ERROR}
              className={classes.button}
              onClick={handleOpenBlockUntil}
            >
              {t('button.block_until')}
            </Button>
          </div>
        )}
        {isBlockUntil && (
          <>
            <div className={classes.modal__date_picker_until}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label={t('input_name.block_until')}
                  disablePast
                  value={dateTimePickerValue}
                  ref={handleDateTimePickerRef}
                  onChange={(newValue) => {
                    setDateTimePickerValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
            <div className={classes.modal__actions}>
              <Button
                variant={BUTTON_VARIANTS.CONTAINED}
                size={BUTTON_SIZES.MEDIUM_LONG}
                color={BUTTON_COLORS.ERROR}
                onClick={handleCloseBlockUntil}
              >
                {t('button.back')}
              </Button>
              <ConfirmationModal
                isOpened={isConfirmationModalOpened}
                onCancel={closeConfirmationModal}
                onConfirm={handleBlockUntilAccept}
                text={`Are you sure you want to block ${userInfo.firstName} ${
                  userInfo.lastName
                } until ${moment(dateTimePickerValue).format('DD.MM.YYYY LTS')}`}
              />
              <Button
                variant={BUTTON_VARIANTS.CONTAINED}
                size={BUTTON_SIZES.MEDIUM_LONG}
                color={BUTTON_COLORS.SUCCESS}
                className={classes.button_until}
                onClick={openConfirmationModal}
                disabled={!dateTimePickerValue}
              >
                {t('button.accept')}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

export default AdminBlockModal;
