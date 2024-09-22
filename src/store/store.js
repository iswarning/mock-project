import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import appReducer from "./reducers/appReducer";
import authReducer from "./reducers/authReducer";

const customizedMiddleware = {
  serializableCheck: false,
};

const allReducer = combineReducers({
  authStore: authReducer,
  appStore: appReducer,
});

const persistConfig = {
  key: 'root',
  storage
}
 
const persistedReducer = persistReducer(persistConfig, allReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(customizedMiddleware),
});

const persistor = persistStore(store)

export { store, persistor }