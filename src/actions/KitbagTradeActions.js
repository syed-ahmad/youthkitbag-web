import axios from 'axios';
import { CREATE_KITBAG_TRADE, FETCH_KITBAG_TRADES, FETCH_KITBAG_TRADE, EDIT_KITBAG_TRADE, DELETE_KITBAG_TRADE, API_KITBAG_ERROR } from './types';
import history from '../helpers/history';
import * as types from '../actions/types';

const baseUrl = process.env.REACT_APP_YKAPI || 'http://localhost:8080';

export const fetchKitbagTrades = (search = '', by = 'all', page = 1, pagesize = 24) => dispatch => {
  ////console.log('FETCH TRADES');
  const token = localStorage.getItem('token');
  axios.get(`${baseUrl}/kitbag/trade`, {
      params: { search, by, page, pagesize },
      headers: {
        Authorization: `bearer ${token}`,
        'content-type': 'application/json'
      }
    })
    .then(response => {
      console.log('RESPONSE', response);
      dispatch({ type: FETCH_KITBAG_TRADES, payload: response.data });
      history.push(`/kitbag/trades?search=${search}&by=${by}&page=${page}&pagesize=${pagesize}`);
    })
    .catch(err => {
      //console.log('ERROR', err);
      const { response } = err;
      if (response.status === 401) {
        window.localStorage.clear();
        dispatch({ type: types.GETALL_FAILURE, payload: response });
        history.push('/auth/login?return=/kitbag/trades');
      }
      dispatch({ type: API_KITBAG_ERROR, payload: response });
    });
};


export const fetchKitbagTrade = (tradeId) => dispatch => {
  const token = localStorage.getItem('token');
  axios.get(`${baseUrl}/kitbag/trade/${tradeId}`, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(response => {
    dispatch({ type: FETCH_KITBAG_TRADE, payload: response.data });
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: types.GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/kitbag/trades');
    }
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  });
};

export const createKitbagTrade = (formValues) => dispatch => {
  const token = localStorage.getItem('token');
  axios.post(`${baseUrl}/kitbag/trade`, {...formValues}, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(response => {
    dispatch({ type: CREATE_KITBAG_TRADE, payload: response.data });
    history.push('/kitbag/trades');
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: types.GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/kitbag/trades');
    }
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  });
}

export const editKitbagTrade = (tradeId, formValues) =>  dispatch => {
  console.log('EDITTRADE', formValues);
  const token = localStorage.getItem('token');
  axios.put(`${baseUrl}/kitbag/trade/${tradeId}`, {...formValues}, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(response => {
    dispatch({ type: EDIT_KITBAG_TRADE, payload: response.data });
    history.push('/kitbag/trades');
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: types.GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/kitbag/trades');
    }
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  });
};

export const deleteKitbagTrade = (tradeId) => dispatch => {
  const token = localStorage.getItem('token');
  axios.delete(`${baseUrl}/kitbag/trade/${tradeId}`, {
    headers: {
      Authorization: `bearer ${token}`,
      'content-type': 'application/json',
    }
  })
  .then(() => {
    dispatch({ type: DELETE_KITBAG_TRADE, payload: tradeId });
    history.push('/kitbag/trades');
  })
  .catch(err => {
    const { response } = err;
    if (response.status === 401) {
      window.localStorage.clear();
      dispatch({ type: types.GETALL_FAILURE, payload: response});
      history.push('/auth/login?return=/kitbag/trades');
    }
    dispatch({ type: API_KITBAG_ERROR, payload: err.response });
  })
}
