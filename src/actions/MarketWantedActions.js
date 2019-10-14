import axios from 'axios';
import {
  FETCH_MARKET_WANTEDS,
  FETCH_MARKET_WANTED,
  API_MARKET_ERROR,
  GETALL_FAILURE,
  OFFER_MARKET_WANTED
} from './types';
import history from '../helpers/history';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchMarketWanteds = (
  search = '',
  by = 'all',
  page = 1,
  pagesize = 24
) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .get(`${baseUrl}/market/wanted`, {
      params: { search, by, page, pagesize },
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: FETCH_MARKET_WANTEDS, payload: response.data });
      history.push(
        `/market/wanted?search=${search}&by=${by}&page=${page}&pagesize=${pagesize}`
      );
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/market/wanted');
      }
      dispatch({ type: API_MARKET_ERROR, payload: response });
    });
};

export const fetchMarketWanted = wantedId => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .get(`${baseUrl}/market/wanted/${wantedId}`, {
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: FETCH_MARKET_WANTED, payload: response.data });
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/market/wanted');
      }
      dispatch({ type: API_MARKET_ERROR, payload: err.response });
    });
};

export const offerMarketWanted = (wantedId, formValues) => dispatch => {
  const token = localStorage.getItem('token');
  axios
    .post(
      `${baseUrl}/market/wanted/offer/${wantedId}`,
      { ...formValues },
      {
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      }
    )
    .then(response => {
      dispatch({ type: OFFER_MARKET_WANTED, payload: response.data });
      history.push(`/market/wanted/${wantedId}`);
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: GETALL_FAILURE, payload: response });
        history.push(`/auth/login?return=/market/wanted/${wantedId}`);
      }
      dispatch({ type: API_MARKET_ERROR, payload: err.response });
    });
};
