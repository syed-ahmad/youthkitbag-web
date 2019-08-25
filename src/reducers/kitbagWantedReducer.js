import * as types from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  ////console.log('KBWANT', action.type, action.payload);
  switch (action.type) {
    case types.FETCH_KITBAG_WANTEDS:
      return { ...state, items: action.payload.kits, filter: action.payload.filter, pagination: action.payload.pagination };
    case types.FETCH_KITBAG_WANTED:
      return { ...state, current: action.payload };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};