import { GET_ADMIN_PROJECTS_DATA } from '../constants';

const initialState = {
  adminProjects: [],
};

const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ADMIN_PROJECTS_DATA:
      return {
        ...state,
        adminProjects: payload.data,
      };
    default:
      return state;
  }
};

export default projectReducer;
