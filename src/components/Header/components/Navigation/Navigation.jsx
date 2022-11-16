import { useState } from 'react';

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';

import DropDown from '../../../../shared/components/DropDown/DropDown';
import { PUBLIC_ROUTES } from '../../../../constants/app.constants';

import { logoutUser } from '../../../../slices/user.slice';

import LocalStorageService from '../../../../services/LocalStorageService';

import classes from './navigation.module.css';
import { LANGUAGE, SELECT_LANGUAGE } from './navigation.constatns';

const computedLanguage = (lang) => {
  if (lang === LANGUAGE.EN) {
    return 'en';
  }
  if (lang === LANGUAGE.RU) {
    return 'ru';
  }
  if (lang === LANGUAGE.DE) {
    return 'de';
  }
  return 'en';
};

function Navigation({ isPrivatePage }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [valueDropDown, setValueDropDown] = useState(LANGUAGE.EN);

  const handleDropDownChange = (item) => {
    setValueDropDown(item.value);
    i18n.changeLanguage(computedLanguage(item.value));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    LocalStorageService.clear();
    navigate(PUBLIC_ROUTES.LOGIN);
  };

  return (
    <div className={classes.navigation__wrapper}>
      <div className={classes.dropdown__block}>
        <DropDown
          value={valueDropDown}
          onListItemClick={handleDropDownChange}
          items={SELECT_LANGUAGE}
        />
      </div>
      {isPrivatePage && (
        <div className={classes.logout__block}>
          <button className={classes.logout_btn} onClick={handleLogout} type="button">
            {t('log_out')}
          </button>
        </div>
      )}
    </div>
  );
}

Navigation.propTypes = {
  isPrivatePage: PropTypes.bool.isRequired
};

export default Navigation;
