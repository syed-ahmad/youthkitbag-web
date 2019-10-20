import {
  FETCH_MARKET_ITEMS,
  FETCH_MARKET_ITEM,
  LOGOUT
} from '../actions/types';

const initialState = { list: [], current: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MARKET_ITEMS:
      return { list: action.payload.items, current: {} };
    case FETCH_MARKET_ITEM:
      return { list: [], current: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
