import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import appReducer from "./reducers/appReducer";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";

const customizedMiddleware = {
  serializableCheck: false,
};

const allReducer = combineReducers({
  authStore: authReducer,
  appStore: appReducer,
  userStore: userReducer,
});

const store = configureStore({
  reducer: allReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(customizedMiddleware),
});

export { store };
