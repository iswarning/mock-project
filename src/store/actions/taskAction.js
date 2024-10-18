import { TOAST } from "../../common/constants";
import { ToastCommon } from "../../components/ToastCommon";
import axiosInstance from "../../config/axios-config";
import { SET_LIST_TASK } from "../constants";
import { hideLoading, showLoading } from "./appAction";

export const getListTask = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(showLoading());
      const resp = await axiosInstance.get(
        import.meta.env.VITE_BASE_URL + "/api/task"
      );

      console.log("getListTask", resp);

      if (resp) {
        dispatch({
          type: SET_LIST_TASK,
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

export const getListTaskByUserId = (params) => {
  return async (dispatch, getState) => {
    try {
      dispatch(showLoading());
      const resp = await axiosInstance.get(
        import.meta.env.VITE_BASE_URL + "/api/gettaskbyuser/" + params.userId
      );

      if (resp) {
        dispatch({
          type: SET_LIST_TASK,
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

export const createTask = (params) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.post(
        import.meta.env.VITE_BASE_URL + "/api/task",
        params
      );

      if (res) {
        dispatch(getListTask());
        ToastCommon(TOAST.SUCCESS, "Created task new successfully");
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
};

export const updateTask = (params) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.put(
        import.meta.env.VITE_BASE_URL + "/api/task",
        params
      );

      if (res) {
        ToastCommon(TOAST.SUCCESS, "Task saved successfully");
        document.getElementById("close-edit-task-btn").click();
        dispatch(getListTask());
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
};

export const changeStatus = (params, userId) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.put(
        import.meta.env.VITE_BASE_URL + "/api/task",
        params
      );

      if (res) {
        dispatch(getListTaskByUserId({ userId: getState().authStore.userInfo.id }));
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
};

export const deleteTask = (params) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.delete(
        import.meta.env.VITE_BASE_URL + "/api/task",
        {
          data: params,
        }
      );

      if (res) {
        dispatch(getListTask());
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
};
