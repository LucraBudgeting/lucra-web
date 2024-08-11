import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';

import authenticationReducer from './slices/Authentication.slice';
import onboardingSliceReducer from './slices/Onboarding.slice';
import dashboardSliceReducer from './slices/Dashboard.slice';

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  onboarding: onboardingSliceReducer,
  dashboard: dashboardSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  });
};

export const store = setupStore();
export type Store = ReturnType<typeof setupStore>;
