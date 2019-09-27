import {
  FETCH_KITBAG_KITS,
  FETCH_KITBAG_TRADES,
  FETCH_KITBAG_WANTEDS,
  FETCH_KITBAG_STOLENS,
  FETCH_MARKET_TRADES,
  FETCH_MARKET_WANTEDS,
  FETCH_MARKET_STOLENS,
  FETCH_GROUPS,
  LOGOUT
} from "../actions/types";

const initialState = { totalItems: 0, itemsPerPage: 24, currentPage: 1 };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITBAG_KITS:
    case FETCH_KITBAG_TRADES:
    case FETCH_KITBAG_WANTEDS:
    case FETCH_KITBAG_STOLENS:
    case FETCH_MARKET_TRADES:
    case FETCH_MARKET_WANTEDS:
    case FETCH_MARKET_STOLENS:
    case FETCH_GROUPS:
      return { ...state, ...action.payload.pagination };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
