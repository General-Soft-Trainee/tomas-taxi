import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useLocation } from 'react-router-dom';

import { PRIVATE_ROUTES } from '../../../../../constants/app.constants';

import Button from '../../../../../shared/components/Button/Button';
import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_VARIANTS
} from '../../../../../shared/components/Button/button.constants';
import { useModal } from '../../../../../shared/hooks/useModal';

import { AdminBlockProps } from './admin-block.types';

import AdminBlockModal from './components/AdminBlockModal/AdminBlockModal';

function AdminBlock({ title, userInfo, getUsers }: AdminBlockProps) {
  const { t } = useTranslation();
  const { isModalOpened, closeModal, openModal } = useModal();
  return (
    <>
      <AdminBlockModal
        userInfo={userInfo}
        getUsers={getUsers}
        isOpened={isModalOpened}
        closeModal={closeModal}
        title={title}
      />
      <Button
        variant={BUTTON_VARIANTS.CONTAINED}
        size={BUTTON_SIZES.EXTRA_SMALL}
        color={BUTTON_COLORS.ERROR}
        onClick={openModal}
      >
        {t('button.block')}
      </Button>
    </>
  );
}

export default AdminBlock;
