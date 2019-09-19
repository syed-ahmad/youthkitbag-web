import * as types from '../actions/types';

const initialState = { current: {}, newImages: [], list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_KITBAG_WANTED:
        return { ...state, current: action.payload, newImages: [] };
    case types.CREATE_KITBAG_WANTED:
      return { ...state, current: action.payload, newImages: [] };
    case types.EDIT_KITBAG_WANTED:
      return { ...state, current: action.payload, newImages: [] };
    case types.FETCH_KITBAG_WANTEDS:
      return { ...state, list: action.payload.wanteds, current: {}, newImages: [] };
    case types.ADD_IMAGE:
      return { ...state, newImages: [...state.newImages, action.payload.photo] };
    case types.CLEAR_NEW_IMAGES:
      return { ...state, newImages: [] };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};