import React from 'react';

import PropTypes from 'prop-types';

import Link from '../../shared/components/Link/Link';

import { PRIVATE_ROUTES } from '../../constants/app.constants';

import Navigation from './components/Navigation/Navigation';

import classes from './header.module.css';

function Header({ isPrivatePage }) {
  return (
    <div className={classes.header__wrapper}>
      <Navigation isPrivatePage={isPrivatePage} />
      {isPrivatePage && (
        <div className={classes.header}>
          <div className={classes.container}>
            <Link to={PRIVATE_ROUTES.HOME} className={classes.header__link}>
              <h1 className={classes.header__title}>GeneralSoft Taxi</h1>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  isPrivatePage: PropTypes.bool
};

Header.defaultProps = {
  isPrivatePage: false
};

export default Header;
