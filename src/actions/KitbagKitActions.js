import { CREATE_KITBAG_KIT, FETCH_KITBAG_KITS, FETCH_KITBAG_KIT, EDIT_KITBAG_KIT, DELETE_KITBAG_KIT } from './types';
import API from '../helpers/api';

export const fetchKitbagKits = (search = '', by = 'all', page = 1, pagesize = 24) => dispatch => {
    API.get('/kitbag/kits', {
      params: { search, by, page, pagesize }
    })
    .then(response => {
      dispatch({ type: FETCH_KITBAG_KITS, payload: response.data });
    })
    .catch(err => {
      console.log('ERROR!!!', err);
    });
};

export const fetchKitbagKit = (id) =>  async dispatch => {
  const response = await API.get(`/kitbag/kits/${id}`);
  dispatch({ type: FETCH_KITBAG_KIT, payload: response.data });
};

export const createKitbagKit = (formValues) => async dispatch => {
  const response = await API.post('/kitbag/kits', formValues);
  dispatch({ type: CREATE_KITBAG_KIT, payload: response.data });
}

export const editKitbagKit = (id, formValues) =>  async dispatch => {
  const response = await API.put(`/kitbag/kits/${id}`, formValues);
  dispatch({ type: EDIT_KITBAG_KIT, payload: response.data });
};

export const deleteKitbagKit = (id) => async dispatch => {
  await API.delete(`/kitbag/kits/${id}`);
  dispatch({ type: DELETE_KITBAG_KIT, payload: id });
}
