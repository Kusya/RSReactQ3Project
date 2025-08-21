import { configureStore } from '@reduxjs/toolkit';
import authorizationDataReducer from './authorizationDataSlice';

export const store = configureStore({
  reducer: {
    authorizationData: authorizationDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
