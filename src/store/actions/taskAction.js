import { TOAST } from "../../common/constants";
import { ToastCommon } from "../../components/ToastCommon";
import axiosInstance from "../../config/axios-config";
import { SET_TASK_BY_USER } from "../constants";
import { hideLoading, showLoading } from "./appAction";

export const getTaskByUser = (id) => {
  console.log(id);

  return async (dispatch, getState) => {
    try {
      dispatch(showLoading());
      const resp = await axiosInstance.get(
        import.meta.env.VITE_BASE_URL + `/api/gettaskbyuser/${id}`
      );

      if (resp) {
        dispatch({
          type: SET_TASK_BY_USER,
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

export const createTask = (taskData) => {
  return async (dispatch, getState) => {
    const res = await axiosInstance.post(
      import.meta.env.VITE_BASE_URL + "/api/task",
      taskData
    );

    try {
      if (res.status === 200) {
        // dispatch(getTask());
        ToastCommon(TOAST.SUCCESS, "Created project successfully");
      }
    } catch (error) {
      ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message);
    }
  };
};
