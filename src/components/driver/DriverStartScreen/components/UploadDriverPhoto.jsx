import React, { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { PRIVATE_ROUTES } from '../../../../constants/app.constants';

import Button from '../../../../shared/components/Button/Button';
import {
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_VARIANTS
} from '../../../../shared/components/Button/button.constants';

import { getUser, uploadUserPhoto, userSelector } from '../../../../slices/user.slice';

import { addNotification } from '../../../../slices/notifications.slice';

import { NOTIFICATION_TYPES } from '../../../../shared/components/Notifications/components/Notification/notification.constants';

import { inputType, src } from './upload-driver-photo.constants';

import classes from './upload-driver-photo.module.css';

function UploadDriverPhoto() {
  const { t } = useTranslation();
  const {
    userData: { car, id }
  } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const image = selectedFile ? imagePreview : src.photo;
  const fileInput = useRef();

  useEffect(() => {
    if (car?.photo) {
      navigate(PRIVATE_ROUTES.HOME);
    }
  }, [car?.photo, navigate]);

  useEffect(() => {
    if (!selectedFile) {
      return setSelectedFile(null);
    }
    const imageUrl = URL.createObjectURL(selectedFile);
    setImagePreview(imageUrl);
    setIsValid(true);
    return () => URL.revokeObjectURL(imageUrl);
  }, [selectedFile]);

  const handleFileSelected = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    fileInput.current.click();
  };

  const handleFileSave = async () => {
    await dispatch(uploadUserPhoto({ file: selectedFile, id }))
      .unwrap()
      .catch(({ message }) => {
        dispatch(addNotification({ type: NOTIFICATION_TYPES.ERROR, message }));
      });
    await dispatch(getUser())
      .unwrap()
      .catch(({ message }) => {
        dispatch(addNotification({ type: NOTIFICATION_TYPES.ERROR, message }));
      });
    navigate(PRIVATE_ROUTES.HOME);
  };

  return (
    <div className={classes.container}>
      <div className={classes.photo__wrapper}>
        <h2 className={classes.photo__title}>{t('driver_photo.title')}</h2>
        <p className={classes.photo__text}>
          {t('driver_photo.text1')}
          <br />
          {t('driver_photo.text2')}
        </p>
        <div className={classes.photo__content}>
          <div
            className={classes.photo}
            style={{
              backgroundImage: `url(${image})`
            }}
          />
          <div className={classes.block__buttons}>
            <input
              className={classes.input_file}
              type={inputType.file}
              onChange={handleFileSelected}
              accept=".png, .jpeg, .jpg"
              ref={fileInput}
            />
            <Button
              size={BUTTON_SIZES.LARGE}
              variant={BUTTON_VARIANTS.CONTAINED}
              color={BUTTON_COLORS.SECONDARY}
              onClick={handleFileUpload}
            >
              {t('button.upload_photo')}
            </Button>
            <Button
              size={BUTTON_SIZES.LARGE}
              color={BUTTON_COLORS.SUCCESS}
              variant={BUTTON_VARIANTS.CONTAINED}
              onClick={handleFileSave}
              className={classes.button}
              disabled={!isValid}
            >
              {t('button.save')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadDriverPhoto;
