import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authorizationDataReducer from './authorizationDataSlice';

export const store = configureStore({
  reducer: {
    authorizationData: authorizationDataReducer,
  },
});
const rootReducer = combineReducers({
  authorizationData: authorizationDataReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
