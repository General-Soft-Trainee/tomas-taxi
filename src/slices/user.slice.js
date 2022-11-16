import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejectedWithValue
} from '@reduxjs/toolkit';

import { t } from 'i18next';

import { getUsers, userBlocked } from '../api/hooks/useUsers/users.actions';

import { API_ROUTES } from '../constants/api.constants';
import { REQUEST_STATUS, USER_VALUES } from '../constants/app.constants';
import { axiosService } from '../services/axios.service';
import LocalStorageService from '../services/LocalStorageService';
import { NOTIFICATION_TYPES } from '../shared/components/Notifications/components/Notification/notification.constants';

import { addNotification } from './notifications.slice';

const INITIAL_STATE = {
  userData: {
    createdAt: null,
    currentOrder: null,
    email: '',
    firstName: '',
    id: '',
    lastName: '',
    role: ''
  },
  status: REQUEST_STATUS.IDLE,
  isAuthenticated: LocalStorageService.isAuthenticated,
  users: []
};

export const getUser = createAsyncThunk('user/get', async (_, { rejectWithValue }) => {
  try {
    const { data: userInfo } = await axiosService.get(API_ROUTES.USER_ME);
    LocalStorageService.role = userInfo.role;
    return userInfo;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const registrationUser = createAsyncThunk(
  'user/registration',
  async (requestPayload, { dispatch, rejectWithValue }) => {
    try {
      await axiosService.post(API_ROUTES.REGISTER, requestPayload);
      dispatch(
        addNotification({
          type: NOTIFICATION_TYPES.SUCCESS,
          message: t('notifications_message.register_success')
        })
      );
    } catch (error) {
      if (error.response) {
        throw rejectWithValue(error.response.data);
      }
    }
  }
);

export const finishedUserTrip = createAsyncThunk(
  'user/finished-trip',
  async ({ driverId, rating, tripId }) => {
    await axiosService.patch(`${API_ROUTES.USER}/${driverId}`, { rating, tripId });
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (requestPayload, { dispatch, rejectWithValue }) => {
    try {
      LocalStorageService.user = USER_VALUES;
      const {
        data: { accessToken, refreshToken, expirationTime }
      } = await axiosService.post(API_ROUTES.LOGIN, requestPayload);
      LocalStorageService.isAuthenticated = true;
      LocalStorageService.accessToken = accessToken;
      LocalStorageService.refreshToken = refreshToken;
      LocalStorageService.expirationTime = expirationTime;
      dispatch(
        addNotification({
          type: NOTIFICATION_TYPES.SUCCESS,
          message: t('notifications_message.login_success')
        })
      );
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

export const resetUserPassword = createAsyncThunk(
  'user/reset-password',
  async (requestPayload, { dispatch, rejectWithValue }) => {
    try {
      await axiosService.post(API_ROUTES.RESET_PASSWORD, requestPayload);
      dispatch(
        addNotification({
          type: NOTIFICATION_TYPES.SUCCESS,
          message: t('notfications_message.forgot_success')
        })
      );
    } catch (error) {
      throw rejectWithValue(error.response.message);
    }
  }
);

export const uploadUserPhoto = createAsyncThunk('user/upload-photo', async ({ file, id }) => {
  const formData = new FormData();
  formData.append('file', file);
  await axiosService.post(`${API_ROUTES.USER}/${id}/${API_ROUTES.PHOTO}`, formData);
});

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    logoutUser: () => {
      return INITIAL_STATE;
    }
  },
  extraReducers: (builder) =>
    builder

      .addCase(getUser.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCESS;
        state.userData = action.payload;
      })

      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCESS;
        state.users = action.payload;
      })

      .addCase(loginUser.fulfilled, (state) => {
        state.isAuthenticated = true;
      })

      .addMatcher(
        isPending(
          getUser,
          registrationUser,
          resetUserPassword,
          uploadUserPhoto,
          finishedUserTrip,
          userBlocked
        ),
        (state) => {
          state.status = REQUEST_STATUS.LOADING;
        }
      )

      .addMatcher(
        isFulfilled(
          registrationUser,
          resetUserPassword,
          uploadUserPhoto,
          finishedUserTrip,
          userBlocked
        ),
        (state) => {
          state.status = REQUEST_STATUS.SUCCESS;
        }
      )

      .addMatcher(
        isRejectedWithValue(getUser, loginUser, registrationUser, getUsers, userBlocked),
        (state, action) => {
          state.status = REQUEST_STATUS.FAILED;
          state.error = action.error.message;
        }
      )
});

export const userSelector = (state) => state.user;

export default userSlice.reducer;

export const { logoutUser } = userSlice.actions;
