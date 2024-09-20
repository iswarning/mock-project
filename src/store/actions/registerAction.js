import axios from "axios";
import { REGISTER_SUCCESS } from "../constants";
import { ToastCommon } from "../../components/ToastCommon";
import { TOAST } from "../../common/constants";

export const signUp = (params, showSignUp) => {
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
          ToastCommon(TOAST.SUCCESS, "Successfully registered");
          showSignUp()
        }
      } catch (error) {
        ToastCommon(TOAST.ERROR, error.response.data.message || "Register failed")
      }
    };
  };