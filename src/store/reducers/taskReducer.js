import { SET_LIST_TASK } from "../constants";

const initState = {
  listTask: [],
};

const taskReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_LIST_TASK:
      return {
        ...state,
        listTask: payload,
      };

    default:
      return state;
  }
};

export default taskReducer;
