import {
  FETCH_KITBAG_STOLEN,
  CREATE_KITBAG_STOLEN,
  EDIT_KITBAG_STOLEN,
  DELETE_KITBAG_STOLEN,
  FETCH_KITBAG_STOLENS,
  LOGOUT
} from '../actions/types';

const initialState = { current: {}, list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITBAG_STOLEN:
      return { ...state, current: action.payload };
    case CREATE_KITBAG_STOLEN:
      return { current: action.payload.stolen, list: [] };
    case EDIT_KITBAG_STOLEN:
      return { ...state, current: action.payload };
    case DELETE_KITBAG_STOLEN:
      return { ...state };
    case FETCH_KITBAG_STOLENS:
      return {
        ...state,
        list: action.payload.stolens,
        current: {}
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
