import axios from 'axios';
import { FETCH_MARKET_TRADES, FETCH_MARKET_TRADE, API_MARKET_ERROR } from './types';
import history from '../helpers/history';
import * as types from './types';

const baseUrl = process.env.REACT_APP_YKBAPI || 'http://localhost:8080';

export const fetchMarketTrades = (search = '', by = 'all', page = 1, pagesize = 24) => dispatch => {
  const token = localStorage.getItem('token');
  axios.get(`${baseUrl}/market/trade`, {
      params: { search, by, page, pagesize },
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      dispatch({ type: FETCH_MARKET_TRADES, payload: response.data });
      history.push(`/market/trades?search=${search}&by=${by}&page=${page}&pagesize=${pagesize}`);
    })
    .catch(err => {
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: types.GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/market/trades');
      }
      dispatch({ type: API_MARKET_ERROR, payload: response });
    });
};

export const fetchMarketTrade = (tradeId) => dispatch => {
  const token = localStorage.getItem('token');
  axios.get(`${baseUrl}/market/trade/${tradeId}`, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(response => {
    dispatch({ type: FETCH_MARKET_TRADE, payload: response.data });
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: types.GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/market/trades');
    }
    dispatch({ type: API_MARKET_ERROR, payload: err.response });
  });
};
