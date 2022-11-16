export const PUBLIC_ROUTES = {
  HOME: '/',
  REGISTER: '/register',
  LOGIN: '/login',
  NOT_FOUND_PAGE: '/not-found-page'
};

export const PRIVATE_ROUTES = {
  HOME: '/home',
  ORDER: '/order',
  CURRENT_ORDER: '/current-order',
  DRIVER_START: '/driver-start',
  DRIVER_ORDERS: '/driver-orders',
  TRIP: '/trip',
  ORDERS_HISTORY: '/orders-history',
  REPORTS: '/reports',
  USERS_CLIENTS: '/users/clients',
  USERS_DRIVERS: '/users/drivers'
};

export const STORAGE_KEYS = {
  USER: 'user'
};

export const USER_VALUES = {
  isAuthenticated: false,
  keepUserLoginIn: false,
  accessToken: '',
  refreshToken: '',
  expirationTime: ''
};

export const REQUEST_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILED: 'failed'
};

export const START_PAGE = 1;

export const START_ITEM_PAGE = 5;

export const START_SUBLING_COUNT = 3;

export const START_BOUNDARY_COUNT = 1;

export const PAGINATION_VARIANTS_NUMBERS = [
  { id: 1, value: 5 },
  { id: 2, value: 10 },
  { id: 3, value: 15 },
  { id: 4, value: 20 }
];
