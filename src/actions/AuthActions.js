import * as types from './types';
import axios from 'axios';
import history from '../helpers/history';
import { getUser } from './UserActions';

const baseUrl = process.env.YKBAPI;

// const loginRequest = (userId) => async (dispatch) => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await axios.get(`${baseUrl}/user/${userId}`, { headers: {
//       Authorization: `bearer ${token}`,
//       'content-type': 'application/json',
//     }});
//     localStorage.setItem('authentication', JSON.stringify(response.data.email));
//     localStorage.setItem('user', JSON.stringify(response.data));
//     dispatch({ type: types.GETALL_SUCCESS});
//     dispatch(getUser(userId));
//   } catch (err) {
//     dispatch({ type: types.GETALL_FAILURE, payload: err.response });
//   }
// }

export const login = (email, password) => dispatch => {
  window.localStorage.clear();

  axios.post(`${baseUrl}/auth/login`, { email, password }, {
      'content-type': 'application/json',
    })
    .then(response => {
      const { data } = response;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.userId);
      dispatch({ type: types.LOGIN_SUCCESS, payload: data });
      dispatch(getUser());
      history.push('/kitbag/kits');
    })
    .catch(err => {
      dispatch({ type: types.LOGIN_FAILURE, payload: err.response });
    });
}

export const signup = (email, password, confirmPassword) => async (dispatch) => {
  try {
    window.localStorage.clear();
    const { data } = await axios.post(`${baseUrl}/auth/signup`, { email, password, confirmPassword }, {
      'content-type': 'application/json',
    });
    dispatch({ type: types.SIGNUP_SUCCESS, payload: data });
    history.push('/auth/login', { signup: 'success' });
  } catch (err) {
    console.log('error', err.response, err.message);
    dispatch({ type: types.SIGNUP_FAILURE, payload: err.response });
  }
}

export const logout = () => async (dispatch) => {
  try {
    window.localStorage.clear();
    dispatch({ type: types.LOGOUT })
    history.push('/auth/login')
  } catch (err) {
    if (err.response.status === 401) {
      history.push('/auth/login')
    }
    console.log(err)
  }
}
