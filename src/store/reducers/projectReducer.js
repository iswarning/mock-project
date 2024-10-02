import { GET_PROJECTS_DATA, SET_CURRENT_PAGE } from '../constants';

const initialState = {
  projects: [],
  currentPage: 1,
};

const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROJECTS_DATA:
      return {
        ...state,
        projects: payload.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        }),
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

export default projectReducer;
