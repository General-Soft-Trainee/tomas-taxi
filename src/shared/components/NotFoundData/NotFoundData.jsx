import PropTypes from 'prop-types';

import classes from './not-found-data.module.css';

function NotFoundData({ text, className }) {
  return (
    <div className={classes.wrapper}>
      <div className={`${classes.message__container} ${className}`}>
        <p className={classes.message}>{text}</p>
      </div>
    </div>
  );
}

NotFoundData.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired
};

NotFoundData.defaultProps = {
  className: ''
};

export default NotFoundData;
