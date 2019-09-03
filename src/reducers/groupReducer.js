import * as types from '../actions/types';

const initialState = { current: {}, newImages: [], list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_GROUPS:
      return { ...state, list: action.payload.groups, current: {}, newImages: [] };
    case types.CREATE_GROUP:
      return { ...state, current: action.payload, newImages: [] };
    case types.EDIT_GROUP:
      return { ...state, current: action.payload, newImages: [] };
    case types.API_KITBAG_ERROR:
      return { ...state, error: action.payload };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};