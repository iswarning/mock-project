/* eslint-disable no-unused-vars */
import { TOAST } from '../../common/constants';
import { ToastCommon } from '../../components/ToastCommon';
import axiosInstance from '../../config/axios-config';
import { GET_PROJECTS_BY_USER, GET_PROJECTS_DATA } from '../constants';
import { hideLoading, showLoading } from './appAction';

export const getProjectsData = (params) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const res = await axiosInstance.get(import.meta.env.VITE_BASE_URL + '/api/project');
    try {
      if (res) {
        dispatch({
          type: GET_PROJECTS_DATA,
          payload: res.data,
        });
        dispatch(hideLoading());
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      dispatch(hideLoading());
    }
  };
};

export const getProjectsByUser = (email) => {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const res = await axiosInstance.get(
      import.meta.env.VITE_BASE_URL + `/api/getprojectbyuser/${email}`
    );
    try {
      if (res) {
        dispatch({
          type: GET_PROJECTS_BY_USER,
          payload: res.data,
        });
        dispatch(hideLoading());
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      dispatch(hideLoading());
    }
  };
};

export const createProject = (project) => {
  return async (dispatch, getState) => {
    const res = await axiosInstance.post(import.meta.env.VITE_BASE_URL + '/api/project', project);
    console.log('🚀 ~ res:', res.data);

    try {
      if (res.status === 200) {
        dispatch(getProjectsData());
        ToastCommon(TOAST.SUCCESS, 'Created project successfully');
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message);
    }
  };
};

export const createProjectByUser = (project, email) => {
  console.log('🚀 ~ project:', project);
  console.log('🚀 ~ email:', email);
  return async (dispatch, getState) => {
    const res = await axiosInstance.post(import.meta.env.VITE_BASE_URL + '/api/project', project);
    console.log('🚀 ~ res:', res);

    try {
      if (res.status === 200) {
        dispatch(getProjectsByUser());
        ToastCommon(TOAST.SUCCESS, 'Created project successfully');
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message);
    }
  };
};

export const deleteProject = (id) => {
  return async (dispatch, getState) => {
    const res = await axiosInstance.delete(import.meta.env.VITE_BASE_URL + '/api/project', {
      data: id,
    });
    try {
      if (res.status == 200) {
        dispatch(getProjectsData());
        ToastCommon(TOAST.SUCCESS, 'Deleted project successfully');
      }
    } catch (error) {
      console.log(error);
      ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message);
    }
  };
};

export const updateProject = (project) => {
  return async (dispatch, getState) => {
    try {
      const res = await axiosInstance.put(import.meta.env.VITE_BASE_URL + '/api/project', project);
      if (res.status == 200) {
        ToastCommon(TOAST.SUCCESS, 'Updated project successfully');
        dispatch(getProjectsData());
      }
    } catch (error) {
      ToastCommon(TOAST.ERROR, error.response?.data?.message || error.message);
    }
  };
};
