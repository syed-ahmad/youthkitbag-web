import {
  FETCH_KITBAG_KIT,
  CREATE_KITBAG_KIT,
  EDIT_KITBAG_KIT,
  FETCH_KITBAG_KITS,
  ADD_IMAGE,
  CLEAR_NEW_IMAGES,
  LOGOUT
} from "../actions/types";

const initialState = { current: {}, newImages: [], list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITBAG_KITS:
      return { current: {}, newImages: [], list: action.payload.kits };
    case FETCH_KITBAG_KIT:
      return { current: action.payload, newImages: [], list: [] };
    case CREATE_KITBAG_KIT:
    case EDIT_KITBAG_KIT:
      return { current: action.payload.kit, newImages: [], list: [] };
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
