import * as types from './types'
import axios from 'axios';
import history from '../helpers/history'; 

const baseUrl = process.env.YKBAPI;

export const getUser = () => dispatch => {
  console.log("getUser")
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user');

  axios.get(`${baseUrl}/user/${userId}`, { headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }})
    .then(response => {
      console.log('SUCCESS', response);
      const { data } = response;
      dispatch({ type: types.GETALL_SUCCESS });
      dispatch({ type: types.GET_USER, payload: data });
    })
    .catch(err => {
      const { location } = history;
      if (location.pathname !== '/auth/login') {
        dispatch({ type: types.GETALL_FAILURE, payload: { data: { message: 'You are not authorized for this action. Please login first' }}});
        history.push(`/auth/login?return=${location.pathname}`);
      }
    });
}
