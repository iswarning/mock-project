import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginReducer";
import registerReducer from "./reducers/registerReducer";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const customizedMiddleware = {
  serializableCheck: false,
};

const allReducer = combineReducers({
  loginStore: loginReducer,
  registerStore: registerReducer
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