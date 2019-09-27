import axios from 'axios';
import {
  FETCH_SUBSCRIPTION_PACKAGE,
  API_KITBAG_ERROR,
  GETALL_FAILURE
} from './types';
import history from '../helpers/history';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchSubscriptionPackage = subscriptionId => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .get(`${baseUrl}/subscription/${subscriptionId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: FETCH_SUBSCRIPTION_PACKAGE, payload: response.data });
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/settings/subscriptions/view');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: err.response });
    });
};
