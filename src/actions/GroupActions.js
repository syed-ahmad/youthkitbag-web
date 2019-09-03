import axios from 'axios';
import { FETCH_GROUPS, CREATE_GROUP, EDIT_GROUP, API_KITBAG_ERROR } from './types';
import history from '../helpers/history';
import * as types from './types';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchGroups = (search = '', by = 'all', page = 1, pagesize = 24) => dispatch => {
  const token = localStorage.getItem('token');
  axios.get(`${baseUrl}/group/search`, {
    params: { search, by, page, pagesize },
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json'
    }
  })
  .then(response => {
    dispatch({ type: FETCH_GROUPS, payload: response.data });
    history.push(`/settings/groups?search=${search}&by=${by}&page=${page}&pagesize=${pagesize}`);
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: types.GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/settings/groups');
    }
    dispatch({ type: API_KITBAG_ERROR, payload: response });
  });
};

// export const fetchGroupbagGroup = (groupId) => dispatch => {
//   const token = localStorage.getItem('token');
//   axios.get(`${baseUrl}/account/group/${groupId}`, {
//     headers: {
//       Authorization: `bearer ${token}`,
//       'content-type': 'application/json',
//     }
//   })
//   .then(response => {
//     dispatch({ type: FETCH_GROUP, payload: response.data });
//   })
//   .catch(err => {
//     const { response } = err;
//     if (response.status === 401) {
//       window.localStorage.clear();
//       dispatch({ type: types.GETALL_FAILURE, payload: response});
//       history.push('/auth/login?return=/settings/groups');
//     }
//     dispatch({ type: API_KITBAG_ERROR, payload: err.response });
//   });
// };

export const createGroup = (formValues) => dispatch => {
  const token = localStorage.getItem('token');
  axios.post(`${baseUrl}/group`, {...formValues}, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(response => {
    dispatch({ type: CREATE_GROUP, payload: response.data });
    history.push('/settings/groups');
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: types.GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/settings/groups');
    }
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  });
}

export const editGroup = (groupId, formValues) =>  dispatch => {
  const token = localStorage.getItem('token');
  axios.put(`${baseUrl}/group/${groupId}`, {...formValues}, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(response => {
    dispatch({ type: EDIT_GROUP, payload: response.data });
    history.push('/settings/groups');
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: types.GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/settings/groups');
    }
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  });
};

// export const deleteGroupbagGroup = (groupId) => dispatch => {
//   const token = localStorage.getItem('token');
//   axios.delete(`${baseUrl}/settings/group/${groupId}`, {
//     headers: {
//       Authorization: `bearer ${token}`,
//       'content-type': 'application/json',
//     }
//   })
//   .then(() => {
//     dispatch({ type: DELETE_GROUP, payload: groupId });
//     history.push('/settings/groups');
//   })
//   .catch(err => {
//     const { response } = err;
//     if (response.status === 401) {
//       window.localStorage.clear();
//       dispatch({ type: types.GETALL_FAILURE, payload: response});
//       history.push('/auth/login?return=/settings/groups');
//     }
//     dispatch({ type: API_KITBAG_ERROR, payload: err.response });
//   })
// }
