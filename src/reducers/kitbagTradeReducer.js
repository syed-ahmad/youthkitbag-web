import {
  FETCH_KITBAG_TRADE,
  CREATE_KITBAG_TRADE,
  EDIT_KITBAG_TRADE,
  ADD_IMAGE,
  CLEAR_NEW_IMAGES,
  LOGOUT,
  FETCH_KITBAG_TRADES
} from '../actions/types';

const initialState = { current: {}, newImages: [], list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITBAG_TRADE:
      return { ...state, current: action.payload, newImages: [] };
    case CREATE_KITBAG_TRADE:
      return { current: action.payload.trade, newImages: [], list: [] };
    case EDIT_KITBAG_TRADE:
      return { ...state, current: action.payload, newImages: [] };
    case FETCH_KITBAG_TRADES:
      return {
        ...state,
        list: action.payload.trades,
        current: {},
        newImages: []
      };
    case ADD_IMAGE:
      return {
        ...state,
        newImages: [...state.newImages, action.payload.photo]
      };
    case CLEAR_NEW_IMAGES:
      return { ...state, newImages: [] };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
