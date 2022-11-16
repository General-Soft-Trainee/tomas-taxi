import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { userSelector } from '../../slices/user.slice';

import classes from './home.module.css';

function Home({ title, content, rightSide }) {
  const { t } = useTranslation();
  const {
    userData: { firstName, lastName }
  } = useSelector(userSelector);

  return (
    <div className={classes.container}>
      <div className={classes.block__greetings}>
        <p className={classes.greetings__text}>{t('welcome')}</p>
        <p className={classes.greetings__text}>{`${firstName} ${lastName}`}</p>
      </div>
      {rightSide}
      {title}
      <div className={classes.line} />
      {content}
    </div>
  );
}

Home.propTypes = {
  title: PropTypes.node,
  content: PropTypes.node,
  rightSide: PropTypes.node
};

Home.defaultProps = {
  title: null,
  content: null,
  rightSide: null
};

export default Home;
