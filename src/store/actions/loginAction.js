
// Seperate function move to 2 files loginAction + registerAction

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { TOAST } from "../../common/constants";
import { ToastCommon } from "../../components/ToastCommon";
import {
  LOGIN_SUCCESS,
  LOGOUT,
  SET_USER_INFO
} from "../constants";

export const login = (params, navigateToHome) => {
  return async (dispatch, getState) => {
    try {
      const resp = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/login",
        params
      );
      if (resp) {
        localStorage.setItem("access_token", resp.data.access_token);
        localStorage.setItem("refresh_token", resp.data.refresh_token);
        dispatch({
          type: LOGIN_SUCCESS
        });
        dispatch({
          type: SET_USER_INFO,
          payload: jwtDecode(resp.data.access_token)
        });
        navigateToHome()
      }
    } catch (error) {
      ToastCommon(TOAST.ERROR, error.response.data.message || "Login failed")
    }
  };
};



export const logout = (params) => {
  return async (dispatch, getState) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch({
      type: LOGOUT
    })
  };
};
