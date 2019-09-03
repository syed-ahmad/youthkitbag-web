import * as types from '../actions/types';

const initialState = {current: {}, newImages: [], list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_KITBAG_TRADE:
      return { ...state, current: action.payload, newImages: [] };
    case types.CREATE_KITBAG_TRADE:
      return { ...state, current: action.payload, newImages: [] };
    case types.EDIT_KITBAG_TRADE:
      return { ...state, current: action.payload, newImages: [] };
    // case types.DELETE_KITBAG_TRADE:
    //   return _.omit(state, action.payload);  
    // case types.FETCH_KITBAG_TRADES:
    //   return { ..._.mapKeys(action.payload.kits, '_id') };
    case types.FETCH_KITBAG_TRADES:
      return { ...state, list: action.payload.trades, current: {}, newImages: [] };
    case types.ADD_IMAGE:
      return { ...state, newImages: [...state.newImages, action.payload.photo] };
    case types.CLEAR_NEW_IMAGES:
      return { ...state, newImages: [] };
    case types.API_KITBAG_ERROR:
      return { ...state, error: action.payload };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};