import axios from 'axios';
import {
  CREATE_KITBAG_STOLEN,
  FETCH_KITBAG_STOLENS,
  FETCH_KITBAG_STOLEN,
  EDIT_KITBAG_STOLEN,
  DELETE_KITBAG_STOLEN,
  API_KITBAG_ERROR,
  GETALL_FAILURE
} from './types';
import history from '../helpers/history';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchKitbagStolens = (
  search = '',
  by = 'all',
  page = 1,
  pagesize = 24
) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .get(`${baseUrl}/kitbag/stolen`, {
      params: { search, by, page, pagesize },
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: FETCH_KITBAG_STOLENS, payload: response.data });
      history.push(
        `/kitbag/stolens?search=${search}&by=${by}&page=${page}&pagesize=${pagesize}`
      );
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/kitbag/stolens');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response });
    });
};

export const fetchKitbagStolen = stolenId => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .get(`${baseUrl}/kitbag/stolen/${stolenId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: FETCH_KITBAG_STOLEN, payload: response.data });
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/kitbag/stolens');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const fetchKitbagStolenFromKit = kitId => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .get(`${baseUrl}/kitbag/stolen/add/${kitId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: FETCH_KITBAG_STOLEN, payload: response.data });
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/kitbag/stolens');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const createKitbagStolen = formValues => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .post(
      `${baseUrl}/kitbag/stolen`,
      { ...formValues },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(response => {
      dispatch({ type: CREATE_KITBAG_STOLEN, payload: response.data });
      history.push('/kitbag/stolens');
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/kitbag/stolens');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const editKitbagStolen = (stolenId, formValues) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .put(
      `${baseUrl}/kitbag/stolen/${stolenId}`,
      { ...formValues },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(response => {
      dispatch({ type: EDIT_KITBAG_STOLEN, payload: response.data });
      history.push('/kitbag/stolens');
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/kitbag/stolens');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};

export const deleteKitbagStolen = stolenId => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .delete(`${baseUrl}/kitbag/stolen/${stolenId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(() => {
      dispatch({ type: DELETE_KITBAG_STOLEN, payload: stolenId });
      history.push('/kitbag/stolens');
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/kitbag/stolens');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};
