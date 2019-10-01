import {
  FETCH_KITBAG_TRADE,
  CREATE_KITBAG_TRADE,
  EDIT_KITBAG_TRADE,
  LOGOUT,
  FETCH_KITBAG_TRADES
} from '../actions/types';

const initialState = { current: {}, list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITBAG_TRADE:
      return { ...state, current: action.payload };
    case CREATE_KITBAG_TRADE:
      return { current: action.payload.trade, list: [] };
    case EDIT_KITBAG_TRADE:
      return { ...state, current: action.payload };
    case FETCH_KITBAG_TRADES:
      return {
        ...state,
        list: action.payload.trades,
        current: {}
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
