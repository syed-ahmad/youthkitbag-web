import { RESET_TOAST, GETALL_SUCCESS, GET_USER } from './types'
import axios from 'axios';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const getUser = () => dispatch => {
  dispatch({ type: RESET_TOAST });
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user');

  axios.get(`${baseUrl}/user/${userId}`, { headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }})
    .then(response => {
      const { data } = response;
      dispatch({ type: GETALL_SUCCESS });
      dispatch({ type: GET_USER, payload: data });
    })
    .catch(err => {
    });
}
