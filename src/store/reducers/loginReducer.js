import { LOGIN_ERROR, LOGIN_STATUS, LOGIN_SUCCESS } from "../constants";

const initState = {
  loginStatus: null,
  loginErrorMessage: null,
  userInfo: null
};

const loginReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginErrorMessage: null,
        loginStatus: LOGIN_STATUS.SUCCESS
      }

    case LOGIN_ERROR:
        return {
          ...state,
          loginErrorMessage: payload,
          loginStatus: LOGIN_STATUS.ERROR
        }

    default:
      return state;
  }
};

export default loginReducer;
