import * as types from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  console.log('KBFSALE', action.type, action.payload);
  switch (action.type) {
    case 'FETCH_KITBAG_FORSALES':
      return { ...state, items: action.payload.kits, filter: action.payload.filter, pagination: action.payload.pagination };
    case 'FETCH_KITBAG_FORSALE':
      return { ...state, current: action.payload };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};