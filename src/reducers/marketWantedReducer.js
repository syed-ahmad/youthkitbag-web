import { FETCH_MARKET_WANTEDS, FETCH_MARKET_WANTED, LOGOUT } from '../actions/types';

const initialState = {current: {}, newImages: [], list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MARKET_WANTEDS:
      return { ...state, list: action.payload.wanteds, current: {}, newImages: [] };
    case FETCH_MARKET_WANTED:
      return { ...state, current: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
