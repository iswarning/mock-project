import { TOAST } from "../../common/constants";
import { validateFormSignUp } from "../../common/validate";
import { ToastCommon } from "../../components/ToastCommon";
import axiosInstance from "../../config/axios-config";
import {
    SET_LIST_USER
} from "../constants";
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

export const createUser = (params, onRequestCloseModal, showSaving, hideSaving) => {
  return async (dispatch, getState) => {
    try {
      showSaving()
      validateFormSignUp(params);

      const resp = await axiosInstance.post(
        import.meta.env.VITE_BASE_URL + "/api/user",
        params
      );
      if (resp) {
        hideSaving()
        onRequestCloseModal()
        ToastCommon(TOAST.SUCCESS, "Created user successfully");
        dispatch(getListUser());
      }
    } catch (error) {
      ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message);
      hideSaving()
    }
  };
};

export const deleteUser = (params) => {
    return async (dispatch, getState) => {
      try {
          const resp = await axiosInstance.delete(import.meta.env.VITE_BASE_URL + '/api/user', { data: params})
          if (resp) {
            dispatch(getListUser())
            ToastCommon(TOAST.SUCCESS, 'Deleted user successfully')
          }
      } catch (error) {
        ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message);
      }
  };
};

export const updateUser = (params, onRequestCloseModal, showSaving, hideSaving) => {
  return async (dispatch, getState) => {
    try {
      showSaving()
      const resp = await axiosInstance.put(
        import.meta.env.VITE_BASE_URL + "/api/user",
        params
      );
      if (resp) {
        hideSaving()
        onRequestCloseModal()
        ToastCommon(TOAST.SUCCESS, "Updated user successfully");
        dispatch(getListUser());
      }
    } catch (error) {
      ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message);
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
      ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message);
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
        ToastCommon(TOAST.SUCCESS, "Role has been changed successfully.");
        dispatch(getListUser());
      }
    } catch (error) {
      ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message);
    }
  };
};
