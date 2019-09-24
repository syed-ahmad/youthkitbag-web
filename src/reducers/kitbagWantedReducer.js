import { FETCH_KITBAG_WANTED, CREATE_KITBAG_WANTED, EDIT_KITBAG_WANTED, ADD_IMAGE, CLEAR_NEW_IMAGES, LOGOUT, FETCH_KITBAG_WANTEDS } from '../actions/types';

const initialState = { current: {}, newImages: [], list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITBAG_WANTED:
        return { ...state, current: action.payload, newImages: [] };
    case CREATE_KITBAG_WANTED:
      return { ...state, current: { _id: action.payload._id } };
    case EDIT_KITBAG_WANTED:
      return { ...state, current: action.payload, newImages: [] };
    case FETCH_KITBAG_WANTEDS:
      return { ...state, list: action.payload.wanteds, current: {}, newImages: [] };
    case ADD_IMAGE:
      return { ...state, newImages: [...state.newImages, action.payload.photo] };
    case CLEAR_NEW_IMAGES:
      return { ...state, newImages: [] };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};