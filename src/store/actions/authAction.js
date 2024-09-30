import axios from "axios";
import { TOAST } from "../../common/constants";
import { validateFormSignUp } from "../../common/validate";
import { ToastCommon } from "../../components/ToastCommon";
import { SET_SHOW_SIGNUP, SET_USER_INFO } from "../constants";
import { persistor } from "../store";

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

export const logout = () => {
  return async (dispatch, getState) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    persistor.purge();
  };
};
