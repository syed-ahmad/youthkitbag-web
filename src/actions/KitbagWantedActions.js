import axios from 'axios';
import { CREATE_KITBAG_WANTED, FETCH_KITBAG_WANTEDS, FETCH_KITBAG_WANTED, EDIT_KITBAG_WANTED, DELETE_KITBAG_WANTED, API_KITBAG_ERROR } from './types';
import history from '../helpers/history';
import * as types from './types';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchKitbagWanteds = (search = '', by = 'all', page = 1, pagesize = 24) => dispatch => {
  const token = localStorage.getItem('token');
  axios.get(`${baseUrl}/kitbag/wanted`, {
      params: { search, by, page, pagesize },
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      console.log('RESPONSE', response);
      dispatch({ type: FETCH_KITBAG_WANTEDS, payload: response.data });
      history.push(`/kitbag/wanteds?search=${search}&by=${by}&page=${page}&pagesize=${pagesize}`);
    })
    .catch(err => {
      //console.log('ERROR', err);
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: types.GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/kitbag/wanteds');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response });
    });
};


export const fetchKitbagWanted = (wantedId) => dispatch => {
  const token = localStorage.getItem('token');
  axios.get(`${baseUrl}/kitbag/wanted/${wantedId}`, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(response => {
    dispatch({ type: FETCH_KITBAG_WANTED, payload: response.data });
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: types.GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/kitbag/wanteds');
    }
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  });
};

export const createKitbagWanted = (formValues) => dispatch => {
  const token = localStorage.getItem('token');
  axios.post(`${baseUrl}/kitbag/wanted`, {...formValues}, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(response => {
    dispatch({ type: CREATE_KITBAG_WANTED, payload: response.data });
    history.push('/kitbag/wanteds');
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: types.GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/kitbag/wanteds');
    }
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  });
}

export const editKitbagWanted = (wantedId, formValues) =>  dispatch => {
  console.log('EDITWANTED', formValues);
  const token = localStorage.getItem('token');
  axios.put(`${baseUrl}/kitbag/wanted/${wantedId}`, {...formValues}, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(response => {
    dispatch({ type: EDIT_KITBAG_WANTED, payload: response.data });
    history.push('/kitbag/wanteds');
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: types.GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/kitbag/wanteds');
    }
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  });
};

export const deleteKitbagWanted = (wantedId) => dispatch => {
  const token = localStorage.getItem('token');
  axios.delete(`${baseUrl}/kitbag/wanted/${wantedId}`, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(() => {
    dispatch({ type: DELETE_KITBAG_WANTED, payload: wantedId });
    history.push('/kitbag/wanteds');
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: types.GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/kitbag/wanteds');
    }
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  })
}
