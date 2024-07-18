import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {userSliceReducer} from './slises/userSlise';
import {bootCampBoardAPI} from '../api/bcBoardAPI';

const rootReducer = combineReducers({
  userSliceReducer,
  [bootCampBoardAPI.reducerPath]: bootCampBoardAPI.reducer,
});
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(bootCampBoardAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export * as stateSelectors from "./selector";