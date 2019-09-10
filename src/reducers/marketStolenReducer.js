import { FETCH_MARKET_STOLENS, FETCH_MARKET_STOLEN, LOGOUT } from '../actions/types';

const initialState = {current: {}, newImages: [], list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MARKET_STOLENS:
      return { ...state, list: action.payload.stolens, filter: action.payload.filter, pagination: action.payload.pagination };
    case FETCH_MARKET_STOLEN:
      return { ...state, current: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
