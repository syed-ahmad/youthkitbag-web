import axios from 'axios';
import {
  FETCH_MARKET_STOLENS,
  FETCH_MARKET_STOLEN,
  API_MARKET_ERROR,
  GETALL_FAILURE,
  REPORT_MARKET_STOLEN
} from './types';
import history from '../helpers/history';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchMarketStolens = (
  search = '',
  by = 'all',
  page = 1,
  pagesize = 24
) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .get(`${baseUrl}/market/stolen`, {
      params: { search, by, page, pagesize },
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: FETCH_MARKET_STOLENS, payload: response.data });
      history.push(
        `/market/stolen?search=${search}&by=${by}&page=${page}&pagesize=${pagesize}`
      );
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/market/stolen');
      }
      dispatch({ type: API_MARKET_ERROR, payload: response });
    });
};

export const fetchMarketStolen = stolenId => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .get(`${baseUrl}/market/stolen/${stolenId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: FETCH_MARKET_STOLEN, payload: response.data });
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/market/stolen');
      }
      dispatch({ type: API_MARKET_ERROR, payload: err.response });
    });
};

export const reportMarketStolen = (stolenId, formValues) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .post(
      `${baseUrl}/market/stolen/report/${stolenId}`,
      { ...formValues },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(response => {
      dispatch({ type: REPORT_MARKET_STOLEN, payload: response.data });
      history.push(`/market/stolen/${stolenId}`);
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/market/stolen/${stolenId}`);
      }
      dispatch({ type: API_MARKET_ERROR, payload: err.response });
    });
};
