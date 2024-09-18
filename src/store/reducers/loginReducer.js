import {
  LOGIN_ERROR,
  LOGIN_STATUS,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_USER_INFO,
} from "../constants";

const initState = {
  loginStatus: null,
  loginErrorMessage: null,
  userInfo: null,
};

const loginReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginErrorMessage: null,
        loginStatus: LOGIN_STATUS.SUCCESS,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loginErrorMessage: payload,
        loginStatus: LOGIN_STATUS.ERROR,
      };

    case LOGOUT:
      return {
        ...state,
        loginStatus: LOGIN_STATUS.ERROR,
      };

    case SET_USER_INFO:
      return {
        ...state,
        userInfo: payload,
      };

    default:
      return state;
  }
};

export default loginReducer;
