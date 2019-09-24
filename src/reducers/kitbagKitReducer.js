import { FETCH_KITBAG_KIT, CREATE_KITBAG_KIT, EDIT_KITBAG_KIT, FETCH_KITBAG_KITS, ADD_IMAGE, CLEAR_NEW_IMAGES, LOGOUT } from '../actions/types';

const initialState = {current: {}, newImages: [], list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITBAG_KIT:
      return { ...state, current: action.payload, newImages: [] };
    case CREATE_KITBAG_KIT:
      return { ...state, current: action.payload, newImages: [] };
    case EDIT_KITBAG_KIT:
      return { ...state, current: action.payload, newImages: [] };
    case FETCH_KITBAG_KITS:
      return { ...state, list: action.payload.kits, current: {}, newImages: [] };
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