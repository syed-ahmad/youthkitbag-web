import * as types from '../actions/types';

const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MARKET_STOLENS':
      return { ...state, items: action.payload.kits, filter: action.payload.filter, pagination: action.payload.pagination };
    case 'FETCH_MARKET_STOLEN':
      return { ...state, current: action.payload };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};