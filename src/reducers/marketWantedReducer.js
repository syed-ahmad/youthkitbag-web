import {
  FETCH_MARKET_WANTEDS,
  FETCH_MARKET_WANTED,
  LOGOUT
} from '../actions/types';

const initialState = { list: [], current: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MARKET_WANTEDS:
      return { list: action.payload.wanteds, current: {} };
    case FETCH_MARKET_WANTED:
      return { list: [], current: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
