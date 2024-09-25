import { SET_LOADING, SET_MODAL, SET_SHOW_SIGNUP } from "../constants";

const initState = {
    isShowSignUp: false,
    isLoading: false,
    isShowModal: false
};

const appReducer = (state = initState, { type, payload }) => {
    switch (type) {
      case SET_SHOW_SIGNUP:
        return {
          ...state,
          isShowSignUp: payload
        };

      case SET_LOADING:
        return {
          ...state,
          isLoading: payload
        };
  
      default:
        return state;
    }
};

export default appReducer