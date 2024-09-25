import { SET_CURRENT_USER, SET_LIST_USER } from "../constants";

const initState = {
  listUser: [],
  currentUser: [],
};

const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_LIST_USER:
      return {
        ...state,
        listUser: payload,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    default:
      return state;
  }
};

export default userReducer;
