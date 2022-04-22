import React from 'react';

import PropTypes from 'prop-types';

import classes from './Link.module.css';

function MyLink({ label, href }) {
  return (
    <div>
      <a className={classes.link} href={href} target="_blank" rel="noreferrer">
        {label}
      </a>
    </div>
  );
}

MyLink.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string
};

MyLink.defaultProps = {
  href: '#'
};

export default MyLink;
