import * as types from '../actions/types';

export default ( state = { totalItems: 0, itemsPerPage: 24, currentPage: 1 }, action) => {
  //console.log('PAGTN', action.type, action.payload);
  switch (action.type) {
    case types.FETCH_KITBAG_KITS:
      return { ...state, ...action.payload.pagination }
    default:
      return state;
  }
}