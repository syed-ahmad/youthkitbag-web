import axios from 'axios';
import { FETCH_MARKET_WANTEDS, FETCH_MARKET_WANTED, API_MARKET_ERROR } from './types';
import history from '../helpers/history';
import * as types from './types';

const baseUrl = process.env.REACT_APP_YKAPI || 'http://localhost:8080';

export const fetchMarketWanteds = (search = '', by = 'all', page = 1, pagesize = 24) => dispatch => {
  console.log('GETWANTEDS');
  axios.get(`${baseUrl}/market/wanted`, {
      params: { search, by, page, pagesize }
    })
    .then(response => {
      console.log('RESPONSE', response);
      dispatch({ type: FETCH_MARKET_WANTEDS, payload: response.data });
      history.push(`/market/wanteds?search=${search}&by=${by}&page=${page}&pagesize=${pagesize}`);
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: types.GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/market/wanteds');
      }
      dispatch({ type: API_MARKET_ERROR, payload: response });
    });
};

export const fetchMarketWanted = (wantedId) => dispatch => {
  const token = localStorage.getItem('token');
  axios.get(`${baseUrl}/market/wanted/${wantedId}`, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(response => {
    dispatch({ type: FETCH_MARKET_WANTED, payload: response.data });
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: types.GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/market/wanteds');
    }
    dispatch({ type: API_MARKET_ERROR, payload: err.response });
  });
};
