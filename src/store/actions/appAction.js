import { SET_LOADING, SET_MODAL } from "../constants"

export const showLoading = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: SET_LOADING,
            payload: true
        })
    }
}

export const hideLoading = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: SET_LOADING,
            payload: false
        })
    }
}