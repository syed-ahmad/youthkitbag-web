import * as types from '../actions/types';

const initialState = {current: {}, list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_GROUPS:
      return { ...state, list: action.payload.groups, current: {} };
    case types.API_KITBAG_ERROR:
      return { ...state, error: action.payload };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};