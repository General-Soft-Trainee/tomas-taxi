import { configureStore } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';

import rootReducer from '../slices/index';

const store = configureStore({ reducer: rootReducer });

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
