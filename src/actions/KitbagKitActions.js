import axios from 'axios';
import { CREATE_KITBAG_KIT, FETCH_KITBAG_KITS, FETCH_KITBAG_KIT, API_KITBAG_ERROR } from './types';

const baseUrl = process.env.YKBAPI || 'http://localhost:8080';

export const fetchKitbagKits = (search = '', by = 'all', page = 1, pagesize = 24) => dispatch => {
  const token = localStorage.getItem('token');
  axios.get(`${baseUrl}/kitbag/kits`, {
    params: { search, by, page, pagesize },
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(response => {
    dispatch({ type: FETCH_KITBAG_KITS, payload: response.data });
  })
  .catch(err => {
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  });
};

export const fetchKitbagKit = (id) =>  async dispatch => {
  const token = localStorage.getItem('token');
  axios.get(`${baseUrl}/kitbag/kits/${id}`, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(response => {
    dispatch({ type: FETCH_KITBAG_KIT, payload: response.data });
  })
  .catch(err => {
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  });
};

export const createKitbagKit = (formValues) => async dispatch => {
  const token = localStorage.getItem('token');
  axios.post(`${baseUrl}/kitbag/kits`, {...formValues}, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(response => {
    dispatch({ type: CREATE_KITBAG_KIT, payload: response.data });
  })
  .catch(err => {
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  });
}

// export const editKitbagKit = (id, formValues) =>  async dispatch => {
//   const response = await API.put(`/kitbag/kits/${id}`, formValues);
//   dispatch({ type: EDIT_KITBAG_KIT, payload: response.data });
// };

// export const deleteKitbagKit = (id) => async dispatch => {
//   await API.delete(`/kitbag/kits/${id}`);
//   dispatch({ type: DELETE_KITBAG_KIT, payload: id });
// }
