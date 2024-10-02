import { GET_PROJECTS_BY_USER, GET_PROJECTS_DATA } from '../constants';

const initialState = {
  projects: [],
  projectsByUser: [],
};

const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROJECTS_DATA:
      return {
        ...state,
        projects: payload,
      };
    case GET_PROJECTS_BY_USER:
      return {
        ...state,
        projectsByUser: payload,
      };
    default:
      return state;
  }
};

export default projectReducer;
