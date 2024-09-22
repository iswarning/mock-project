import { SET_SHOW_SIGNUP } from "../constants";

const initState = {
    isShowSignUp: false,
};

const appReducer = (state = initState, { type, payload }) => {
    switch (type) {
      case SET_SHOW_SIGNUP:
        return {
          ...state,
          isShowSignUp: payload
        };
  
      default:
        return state;
    }
};

export default appReducer