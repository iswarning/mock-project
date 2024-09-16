const initState = {
  status: "",
  userList: [],
  loginUser: [],
};

const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "CHANGE_STATUS":
      return {
        ...state,
        status: payload.status,
      };
    case "SET_DATA":
      return {
        ...state,
        userList: payload.data,
      };

    default:
      return state;
  }
};

export default userReducer;
