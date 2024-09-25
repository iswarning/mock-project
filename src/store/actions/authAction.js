import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { TOAST } from "../../common/constants";
import { validateFormLogin, validateFormSignUp } from "../../common/validate";
import { ToastCommon } from "../../components/ToastCommon";
import { SET_DATA_USER, SET_SHOW_SIGNUP, SET_USER_INFO } from "../constants";
import axiosInstance from "../../config/axios-config";

export const login = (params) => {
  return async (dispatch, getState) => {
    try {
      // validation
      validateFormLogin(params);

      const resp = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/login",
        params
      );

      if (resp) {
        localStorage.setItem("access_token", resp.data.access_token);
        localStorage.setItem("refresh_token", resp.data.refresh_token);
        dispatch({
          type: SET_USER_INFO,
          payload: jwtDecode(resp.data.access_token),
        });
      }
    } catch (error) {
      ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message);
    }
  };
};

export const signUp = (params) => {
  return async (dispatch, getState) => {
    try {
      // validation
      validateFormSignUp(params);

      const resp = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/signup",
        {
          name: params.name,
          email: params.email,
          password: params.password,
        }
      );

      if (resp) {
        ToastCommon(TOAST.SUCCESS, "Successfully registered");
        dispatch({
          type: SET_SHOW_SIGNUP,
          payload: false,
        });
      }
    } catch (error) {
      ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message);
    }
  };
};

export const logout = (params) => {
  return async (dispatch, getState) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch({
      type: SET_USER_INFO,
      payload: null,
    });
  };
};

export const getAllUser = (params) => {
  return async (dispatch, getState) => {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL}/api/user`
    );
    console.log(res.data);

    try {
      if (res.status == 200) {
        dispatch({
          type: SET_DATA_USER,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserInfo = (params) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.put(
        `${import.meta.env.VITE_BASE_URL}/api/user/${params.id}`,
        params
      );

      if (res.status === 200) {
        dispatch(getAllUser());
      }
    } catch (error) {
      ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message);
    }
  };
};
