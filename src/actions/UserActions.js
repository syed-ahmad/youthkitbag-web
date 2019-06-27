import * as types from './types'
import axios from 'axios';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

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
    });
}
