import { CREATE_KITBAG_WANTED, FETCH_KITBAG_WANTEDS, FETCH_KITBAG_WANTED, EDIT_KITBAG_WANTED, DELETE_KITBAG_WANTED } from './types';
import API from '../helpers/api';

export const fetchKitbagWanteds = (search = '', by = 'all', page = 1, pagesize = 24) =>  async dispatch => {
    const response = await API.get('/kitbag/wanteds', {
      params: { search, by, page, pagesize }
    });
    dispatch({ type: FETCH_KITBAG_WANTEDS, payload: response.data });
};

export const fetchKitbagWanted = (id) =>  async dispatch => {
  const response = await API.get(`/kitbag/wanteds/${id}`);
  dispatch({ type: FETCH_KITBAG_WANTED, payload: response.data });
};

export const createKitbagWanted = (formValues) => async dispatch => {
  const response = await API.post('/kitbag/wanteds', formValues);
  dispatch({ type: CREATE_KITBAG_WANTED, payload: response.data });
}

export const editKitbagWanted = (id, formValues) =>  async dispatch => {
  const response = await API.put(`/kitbag/wanteds/${id}`, formValues);
  dispatch({ type: EDIT_KITBAG_WANTED, payload: response.data });
};

export const deleteKitbagWanted = (id) => async dispatch => {
  await API.delete(`/kitbag/wanteds/${id}`);
  dispatch({ type: DELETE_KITBAG_WANTED, payload: id });
}
