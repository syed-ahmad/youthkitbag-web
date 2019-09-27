import {
  FETCH_MARKET_TRADES,
  FETCH_MARKET_TRADE,
  LOGOUT
} from "../actions/types";

const initialState = { list: [], current: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MARKET_TRADES:
      return { list: action.payload.trades, current: {} };
    case FETCH_MARKET_TRADE:
      return { list: [], current: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
