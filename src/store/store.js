import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import appReducer from './reducers/appReducer';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import projectReducer from './reducers/projectReducer';

const customizedMiddleware = {
  serializableCheck: false,
};

const allReducer = combineReducers({
  authStore: authReducer,
  appStore: appReducer,
  projectStore: projectReducer,
  userStore: userReducer,
});

const store = configureStore({
  reducer: allReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(customizedMiddleware),
});

export { store };
