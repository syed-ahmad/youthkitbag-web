import * as types from '../actions/types';

const initialState = { totalItems: 0, itemsPerPage: 24, currentPage: 1 };

export default ( state = initialState, action) => {
  ////console.log('PAGTN', action.type, action.payload);
  switch (action.type) {
    case types.FETCH_KITBAG_KITS:
    case types.FETCH_KITBAG_TRADES:
    case types.FETCH_KITBAG_WANTEDS:
    case types.FETCH_KITBAG_STOLENS:
    case types.FETCH_MARKET_TRADES:
    case types.FETCH_MARKET_WANTEDS:
    case types.FETCH_MARKET_STOLENS:
    case types.FETCH_GROUPS:
          return { ...state, ...action.payload.pagination }
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
}