import * as types from '../actions/types';

const initialState = { totalItems: 0, itemsPerPage: 24, currentPage: 1 };

export default ( state = initialState, action) => {
  console.log('PAGTN', action.type, action.payload);
  switch (action.type) {
    case types.FETCH_KITBAG_KITS:
      return { ...state, ...action.payload.pagination }
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}