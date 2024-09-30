import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import appReducer from "./reducers/appReducer";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import storage from 'redux-persist/lib/storage'
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";

const customizedMiddleware = {
  serializableCheck: false,
};

const allReducer = combineReducers({
  authStore: authReducer,
  appStore: appReducer,
  userStore: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, allReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(customizedMiddleware),
});

let persistor = persistStore(store)

export { store, persistor };
