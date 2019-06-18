import { CREATE_KITBAG_FORSALE, FETCH_KITBAG_FORSALES, FETCH_KITBAG_FORSALE, EDIT_KITBAG_FORSALE, DELETE_KITBAG_FORSALE } from './types';
import API from '../helpers/api';

export const fetchKitbagForSales = (search = '', by = 'all', page = 1, pagesize = 24) =>  async dispatch => {
    const response = await API.get('/kitbag/forsales', {
      params: { search, by, page, pagesize }
    });
    dispatch({ type: FETCH_KITBAG_FORSALES, payload: response.data });
};

export const fetchKitbagForSale = (id) =>  async dispatch => {
  const response = await API.get(`/kitbag/forsales/${id}`);
  dispatch({ type: FETCH_KITBAG_FORSALE, payload: response.data });
};

export const createKitbagForSale = (formValues) => async dispatch => {
  const response = await API.post('/kitbag/forsales', formValues);
  dispatch({ type: CREATE_KITBAG_FORSALE, payload: response.data });
}

export const editKitbagForSale = (id, formValues) =>  async dispatch => {
  const response = await API.put(`/kitbag/forsales/${id}`, formValues);
  dispatch({ type: EDIT_KITBAG_FORSALE, payload: response.data });
};

export const deleteKitbagForSale = (id) => async dispatch => {
  await API.delete(`/kitbag/forsales/${id}`);
  dispatch({ type: DELETE_KITBAG_FORSALE, payload: id });
}
