import axios from "axios";

export const getAllUser = (params) => {
  return async (dispatch, getState) => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");

    try {
      if (res) {
        dispatch({
          type: "SET_DATA",
          payload: res,
        });
        dispatch({
          type: "CHANGE_STATUS",
          payload: {
            status: "Success...",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};