/* eslint-disable no-unused-vars */
import axiosInstance from '../../config/axios-config';
import { GET_ADMIN_PROJECTS_DATA } from '../constants';

export const getAdminProjectsData = (params) => {
  return async (dispatch, getState) => {
    const res = await axiosInstance.get(import.meta.env.VITE_BASE_URL + '/api/project');
    try {
      if (res) {
        dispatch({
          type: GET_ADMIN_PROJECTS_DATA,
          payload: res,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createProject = (project) => {
  return async (dispatch, getState) => {
    const res = await axiosInstance.post(import.meta.env.VITE_BASE_URL + '/api/project', project);
    try {
      if (res.status === 200) {
        dispatch(getAdminProjectsData());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProject = (id) => {
  return async (dispatch, getState) => {
    const res = await axiosInstance.delete(
      import.meta.env.VITE_BASE_URL + '/api/project' + `/${id}`
    );
    try {
      if (res.status == 200) {
        dispatch(getAdminProjectsData());
      }
    } catch (error) {
      console.log(error);
    }
  };
};
