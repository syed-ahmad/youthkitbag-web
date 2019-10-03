import {
  GETALL_SUCCESS,
  GET_USER,
  EDIT_USER_PROFILE,
  API_KITBAG_ERROR,
  GETALL_FAILURE
} from './types';
import axios from 'axios';
import history from '../helpers/history';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const getUser = () => dispatch => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user');

  axios
    .get(`${baseUrl}/user/${userId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      const { data } = response;
      dispatch({ type: GETALL_SUCCESS });
      dispatch({ type: GET_USER, payload: data });
    })
    .catch(() => {});
};

export const editProfile = (userId, formValues) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .put(
      `${baseUrl}/user/${userId}/profile`,
      { ...formValues },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(response => {
      dispatch({ type: EDIT_USER_PROFILE, payload: response.data });
      history.push('/settings/account');
    })
    .catch(err => {
      console.log('ERROR', err);
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/account');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};
