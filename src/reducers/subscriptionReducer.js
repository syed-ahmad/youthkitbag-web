import { FETCH_SUBSCRIPTION_PACKAGE, API_KITBAG_ERROR, LOGOUT } from '../actions/types';

const initialState = { selected: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBSCRIPTION_PACKAGE:
      return { selected: action.payload };
    case API_KITBAG_ERROR:
      return { ...state, error: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};