import axios from "axios";
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  SET_USER_INFO
} from "../constants";
import { jwtDecode } from "jwt-decode";

export const login = (params) => {
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
      }
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.message || "Login failed",
      });
    }
  };
};

export const signUp = (params) => {
  return async (dispatch, getState) => {
    try {
      const resp = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/signup",
        params
      );
      if (resp) {
        dispatch({
          type: REGISTER_SUCCESS,
        });
      }
    } catch (error) {
      dispatch({
        type: REGISTER_ERROR,
        payload: error.response.data.message || "Login failed",
      });
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
