import { SET_USER_INFO } from "../constants";

const initState = {
    userInfo: null,
};

const authReducer = (state = initState, { type, payload }) => {
    switch (type) {
      case SET_USER_INFO:
        return {
          ...state,
          userInfo: payload,
        };
  
      default:
        return state;
    }
};

export default authReducer