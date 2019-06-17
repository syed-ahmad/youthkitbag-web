import * as types from './types'
import API from '../helpers/api'
import history from '../helpers/history'

export const fetchKitBagKits = (search = '', by = 'all', page = 1, pagesize = 24) =>  async dispatch => {
  try {
    const response = await API.get('/kitbag/kit', {
      params: { search, by, page, pagesize }
    });
    dispatch({ type: 'FETCH_KITBAG_KITS', payload: response.data });
  } catch (err) {
    dispatch({ type: types.GETALL_FAILURE, payload: err.message })
    history.push('/')
  }
};

export const fetchKitBagKit = (id) =>  async dispatch => {
  const response = await API.get(`/kitbag/kit/${id}`);

  dispatch({ type: 'FETCH_KITBAG_KIT', payload: response.data });
};

export const fetchKitBagForSales = (search = '', by = 'all', page = 1, pagesize = 24) =>  async dispatch => {
  const response = await API.get('/kitbag/forsale', {
    params: { search, by, page, pagesize }
  });

  dispatch({ type: 'FETCH_KITBAG_FORSALES', payload: response.data });
};

export const fetchKitBagForSale = (id) =>  async dispatch => {
  const response = await API.get(`/kitbag/forsale/${id}`);

  dispatch({ type: 'FETCH_KITBAG_FORSALE', payload: response.data });
};

export const fetchKitBagWanteds = (search = '', by = 'all', page = 1, pagesize = 24) =>  async dispatch => {
  const response = await API.get('/kitbag/wanted', {
    params: { search, by, page, pagesize }
  });

  dispatch({ type: 'FETCH_KITBAG_WANTEDS', payload: response.data });
};

export const fetchKitBagWanted = (id) =>  async dispatch => {
  const response = await API.get(`/kitbag/wanted/${id}`);

  dispatch({ type: 'FETCH_KITBAG_WANTED', payload: response.data });
};
