import { TOAST } from "../../common/constants";
import { validateFormSignUp } from "../../common/validate";
import { ToastCommon } from "../../components/ToastCommon";
import axiosInstance from "../../config/axios-config";
import { SET_CURRENT_USER, SET_LIST_USER } from "../constants";
import { hideLoading, showLoading } from "./appAction";

export const getListUser = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(showLoading());
      const resp = await axiosInstance.get(
        import.meta.env.VITE_BASE_URL + "/api/user"
      );
      if (resp) {
        dispatch({
          type: SET_LIST_USER,
          payload: resp.data,
        });
        dispatch(hideLoading());
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      dispatch(hideLoading());
    }
  };
};

export const getUserById = (params) => {
  return async (dispatch, getState) => {
    try {
      console.log(333);

      const resp = await axiosInstance.get(
        import.meta.env.VITE_BASE_URL + "/api/user/" + params.id
      );
      if (resp) {
        dispatch({
          type: SET_CURRENT_USER,
          payload: resp.data,
        });
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
};

export const createUser = (params) => {
  return async (dispatch, getState) => {
    try {
      validateFormSignUp(params);

      const resp = await axiosInstance.post(
        import.meta.env.VITE_BASE_URL + "/api/user",
        params
      );
      if (resp) {
        dispatch(getListUser());
        ToastCommon(TOAST.SUCCESS, "Created user successfully");
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
};

export const deleteUser = (params) => {
  return async (dispatch, getState) => {
    try {
      const resp = await axiosInstance.delete(
        import.meta.env.VITE_BASE_URL + "/api/user",
        params
      );
      if (resp) {
        dispatch(getListUser());
        ToastCommon(TOAST.SUCCESS, "Deleted user successfully");
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
};

export const updateUser = (params) => {
  return async (dispatch, getState) => {
    try {
      const resp = await axiosInstance.put(
        import.meta.env.VITE_BASE_URL + "/api/user",
        params
      );
      if (resp) {
        dispatch(getListUser());
        ToastCommon(TOAST.SUCCESS, "Updated user successfully");
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
};

export const updateUserByUser = (params) => {
  return async (dispatch, getState) => {
    try {
      const resp = await axiosInstance.put(
        import.meta.env.VITE_BASE_URL + "/api/user",
        params
      );
      if (resp) {
        ToastCommon(TOAST.SUCCESS, "Updated user successfully");
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
};

export const changeRole = (params) => {
  return async (dispatch, getState) => {
    try {
      const resp = await axiosInstance.put(
        import.meta.env.VITE_BASE_URL + "/api/user/changerole",
        {
          email: params.email,
          role: params.role,
        }
      );

      if (resp) {
        dispatch(getListUser());
        ToastCommon(TOAST.SUCCESS, "Role has been changed successfully.");
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
};
