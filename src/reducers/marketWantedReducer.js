import * as types from '../actions/types';

const initialState = { list: [] };

export default (state = initialState, action) => {
  console.log('MKTWANT', action.type, action.payload);
  switch (action.type) {
    case types.FETCH_MARKET_WANTEDS:
      return { ...state, list: action.payload.wanteds, current: {}, newImages: [] };
    case types.FETCH_MARKET_WANTED:
      return { ...state, current: action.payload };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};