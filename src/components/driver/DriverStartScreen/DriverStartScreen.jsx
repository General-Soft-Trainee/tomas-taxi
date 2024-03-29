import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { PRIVATE_ROUTES } from '../../../constants/app.constants';
import { userSelector } from '../../../slices/user.slice';

import UploadDriverPhoto from './components/UploadDriverPhoto';

function DriverStartScreen() {
  const {
    userData: { car }
  } = useSelector(userSelector);
  const hasCarPhoto = Boolean(car?.photo);
  return hasCarPhoto ? <Navigate to={PRIVATE_ROUTES.HOME} replace /> : <UploadDriverPhoto />;
}

export default DriverStartScreen;
