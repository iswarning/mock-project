import { SET_CURRENT_PAGE, SET_LIST_USER, SET_RESULT_SEARCH_USER, SET_KEYWORD_SEARCH_USER } from "../constants";

const initState = {
  listUser: [],
  currentPage: 1,
  keyWord: '',
  result: []
};

const userReducer = (state = initState, { type, payload }) => {
    switch (type) {
      case SET_LIST_USER:
        return {
          ...state,
          listUser: payload.sort((a, b) => {
            if (a.email < b.email) return -1;
            if (a.email > b.email) return 1;
            return 0;
          }),
        };

      case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: payload,
        };

      case SET_KEYWORD_SEARCH_USER:
        return {
          ...state,
          keyWord: payload,
        };

      case SET_RESULT_SEARCH_USER:
        return {
          ...state,
          result: payload,
        };
  
      default:
        return state;
    }
};

export default userReducer;
