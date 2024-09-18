import { REGISTER_ERROR, REGISTER_STATUS, REGISTER_SUCCESS } from "../constants";

const initState = {
  registerStatus: null,
  registerErrorMessage: null
};

const registerReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerStatus: REGISTER_STATUS.SUCCESS,
        registerErrorMessage: null,
      }

    case REGISTER_ERROR:
        return {
          ...state,
          registerErrorMessage: payload,
          registerStatus: REGISTER_STATUS.ERROR,
        }

    default:
      return state;
  }
};

export default registerReducer;
