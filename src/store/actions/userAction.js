import axios from "axios";

export const login = (params) => {
  return async (dispatch, getState) => {
    const resp = await axios.post(process.env.VITE_BASE_URL + '/api/login', params);
    try {
      if (resp) {
        console.log(resp)
        if (resp.status === 200) {
          localStorage.setItem('access_token', resp.data.access_token)
          localStorage.setItem('refresh_token', resp.data.refresh_token)
          
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const signUp = (params) => {
  return async (dispatch, getState) => {
    try {
      await axios.post(process.env.VITE_BASE_URL + '/api/signup', params);
    } catch (error) {
      console.log(error);
    }
  }
}

export const logout = (params) => {
  return async (dispatch, getState) => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }
}