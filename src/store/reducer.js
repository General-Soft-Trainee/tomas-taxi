import { combineReducers } from 'redux';

// eslint-disable-next-line import/namespace
import { userReducer } from '../shared/hooks/useUser/user.reducer';
import { spinnerReducer } from '../shared/hooks/useAppSpinner/app-spinner.reducer';
import { notificationsReducer } from '../shared/hooks/useNotifications/notifications.reducer';

const rootReducer = combineReducers({
  notifications: notificationsReducer,
  spinner: spinnerReducer,
  user: userReducer
});

export default rootReducer;
