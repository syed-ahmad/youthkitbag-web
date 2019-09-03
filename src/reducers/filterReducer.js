import * as types from '../actions/types';

const initialState = { by: 'all', search: '', options: [ { key: 'all', value: 'All' } ] };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_KITBAG_KITS:
    case types.FETCH_KITBAG_TRADES:
    case types.FETCH_KITBAG_WANTEDS:
    case types.FETCH_KITBAG_STOLENS:
    case types.FETCH_MARKET_TRADES:
    case types.FETCH_MARKET_WANTEDS:
    case types.FETCH_MARKET_STOLENS:
    case types.FETCH_GROUPS:
      return { ...state, ...action.payload.filter };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
} 