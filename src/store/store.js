import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
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

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(customizedMiddleware),
});

let persistor = persistStore(store);

export { persistor, store };
