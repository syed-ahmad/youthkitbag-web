import {
  FETCH_KITBAG_WANTED,
  CREATE_KITBAG_WANTED,
  EDIT_KITBAG_WANTED,
  LOGOUT,
  FETCH_KITBAG_WANTEDS
} from '../actions/types';

const initialState = { current: {}, list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITBAG_WANTED:
      return { ...state, current: action.payload };
    case CREATE_KITBAG_WANTED:
      return { current: action.payload.wanted, list: [] };
    case EDIT_KITBAG_WANTED:
      return { ...state, current: action.payload };
    case FETCH_KITBAG_WANTEDS:
      return {
        ...state,
        list: action.payload.wanteds,
        current: {}
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
