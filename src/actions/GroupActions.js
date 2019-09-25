import axios from 'axios';
import { FETCH_GROUPS, CREATE_GROUP, FETCH_GROUP, EDIT_GROUP, EDIT_GROUP_STATUS, FETCH_GROUP_MEMBERS, EDIT_GROUP_MEMBER_STATE, API_KITBAG_ERROR, GETALL_FAILURE } from './types';
import history from '../helpers/history';

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
      dispatch({ type: GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/settings/groups');
    }
    dispatch({ type: API_KITBAG_ERROR, payload: response });
  });
};

export const fetchGroup = (groupId) => dispatch => {
  const token = localStorage.getItem('token');
  axios.get(`${baseUrl}/group/${groupId}`, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(response => {
    dispatch({ type: FETCH_GROUP, payload: response.data });
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/settings/groups/view');
    }
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  });
};

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
    history.push('/settings/groups?search=&by=&page=1&pagesize=24');
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/settings/groups?search=&by=&page=1&pagesize=24');
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
    history.push('/settings/groups?search=&by=&page=1&pagesize=24');
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/settings/groups?search=&by=&page=1&pagesize=24');
    }
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  });
};

export const editGroupStatus = (groupId, status) =>  dispatch => {
  const token = localStorage.getItem('token');
  axios.put(`${baseUrl}/group/${groupId}/status`, { status: status }, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(response => {
    dispatch({ type: EDIT_GROUP_STATUS, payload: response.data });
    history.push('/settings/groups?search=&by=&page=1&pagesize=24');
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/settings/groups?search=&by=&page=1&pagesize=24');
    }
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  });
};

export const fetchGroupMembers = (groupId) => dispatch => {
  const token = localStorage.getItem('token');
  axios.get(`${baseUrl}/group/${groupId}/members`, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json'
    }
  })
  .then(response => {
    dispatch({ type: FETCH_GROUP_MEMBERS, payload: response.data });
    history.push(`/settings/groups/${groupId}/members`);
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: GETALL_FAILURE, payload: response});
      history.push(`/auth/login?return=/settings/group/${groupId}/members`);
    }
    dispatch({ type: API_KITBAG_ERROR, payload: response });
  });
};

export const editGroupMemberState = (groupId, memberId, state) => dispatch => {
  const token = localStorage.getItem('token');
  axios.put(`${baseUrl}/group/${groupId}/members/${memberId}/${state}`, {}, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(response => {
    dispatch({ type: EDIT_GROUP_MEMBER_STATE, payload: response.data });
    history.push(`/settings/groups/${groupId}/members`);
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: GETALL_FAILURE, payload: response});
      history.push(`/auth/login?return=/settings/group/${groupId}/members`);
    }
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  })
}