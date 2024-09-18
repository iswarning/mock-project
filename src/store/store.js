import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import persistReducer from "redux-persist/es/persistReducer";
import loginReducer from "./reducers/loginReducer";
import registerReducer from "./reducers/registerReducer";

const customizedMiddleware = {
  serializableCheck: false,
};

const allReducer = combineReducers({
  loginStore: loginReducer,
  registerStore: registerReducer
});

// const persistConfig = {
//   key: 'root',
//   storage,
// }
 
// const persistedReducer = persistReducer(persistConfig, allReducer)

export const store = configureStore({
  reducer: allReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(customizedMiddleware),
});