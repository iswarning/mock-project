import { SET_CURRENT_PAGE, SET_LIST_USER } from "../constants";

const initState = {
  listUser: [],
  currentPage: 1
};

const userReducer = (state = initState, { type, payload }) => {
    switch (type) {
      case SET_LIST_USER:
        return {
          ...state,
          listUser: payload,
        };

      case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: payload,
        };
  
      default:
        return state;
    }
};

export default userReducer;
