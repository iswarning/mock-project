import { SET_LIST_TASK, SET_LIST_TASK_BY_USER } from "../constants";

const initState = {
  listTask: [],
  listTaskByUser: [],
};

const taskReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_LIST_TASK:
      return {
        ...state,
        listTask: payload,
      };

    case SET_LIST_TASK_BY_USER:
      return {
        ...state,
        listTaskByUser: payload,
      };

    default:
      return state;
  }
};

export default taskReducer;
