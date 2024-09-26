import { SET_LIST_USER } from "../constants";

const initState = {
    listUser: [],
    currentUser: null
};

const userReducer = (state = initState, { type, payload }) => {
    switch (type) {
      case SET_LIST_USER:
        return {
          ...state,
          listUser: payload,
        };
  
      default:
        return state;
    }
};

export default userReducer