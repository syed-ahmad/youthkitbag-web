import { FETCH_MARKET_TRADES, FETCH_MARKET_TRADE, LOGOUT } from '../actions/types';

const initialState = {current: {}, newImages: [], list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MARKET_TRADES:
      return { ...state, list: action.payload.trades, filter: action.payload.filter, pagination: action.payload.pagination };
    case FETCH_MARKET_TRADE:
      return { ...state, current: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
