import { SET_TASK_BY_USER } from "../constants";

const initState = {
  taskByUser: [],
};

const taskReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_TASK_BY_USER:
      return {
        ...state,
        taskByUser: payload,
      };

    default:
      return state;
  }
};

export default taskReducer;
