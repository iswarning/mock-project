import axios from "axios";
import { TOAST } from "../../common/constants";
import { validateFormSignUp } from "../../common/validate";
import { ToastCommon } from "../../components/ToastCommon";
import {
  SET_SHOW_SIGNUP,
} from "../constants";
import { auth, db, provider } from "../../../firebase";
import generatePassword from "../../common/generatePassword";
import { SET_SHOW_SIGNUP } from "../constants";
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
    localStorage.removeItem("userName");
    persistor.purge();
  };
};

export const loginWithGoogle = () => {
  return async (dispatch, getState) => {
    try {
      const credential = await auth.signInWithPopup(provider)
      const ref = await db.collection('users').where('email', '==', credential.user.email).get()
      
      if (ref.docs.length > 0) {

        dispatch(login({
          email: ref.docs[0].data().email,
          password: ref.docs[0].data().password,
        }))

      } else {
        const password = generatePassword()

        db.collection('users').add({
          email: credential.user.email,
          password: password
        })

        dispatch(signUp({
          name: credential.user.displayName,
          email: credential.user.email,
          password: password,
          confirmPassword: password,
        }))

        setTimeout(() => {
          dispatch(login({
            email: credential.user.email,
            password: password,
          }))
        },[1000])
      }
    } catch (error) {
      ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message)
    }
  };
};
