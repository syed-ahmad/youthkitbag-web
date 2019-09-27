import {
  FETCH_MARKET_STOLENS,
  FETCH_MARKET_STOLEN,
  LOGOUT
} from "../actions/types";

const initialState = { list: [], current: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MARKET_STOLENS:
      return { list: action.payload.stolens, current: {} };
    case FETCH_MARKET_STOLEN:
      return { list: [], current: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
