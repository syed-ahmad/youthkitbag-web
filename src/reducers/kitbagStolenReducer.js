import {
  FETCH_KITBAG_STOLEN,
  CREATE_KITBAG_STOLEN,
  EDIT_KITBAG_STOLEN,
  DELETE_KITBAG_STOLEN,
  FETCH_KITBAG_STOLENS,
  ADD_IMAGE,
  CLEAR_NEW_IMAGES,
  LOGOUT
} from '../actions/types';

const initialState = { current: {}, newImages: [], list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KITBAG_STOLEN:
      return { ...state, current: action.payload, newImages: [] };
    case CREATE_KITBAG_STOLEN:
      return { current: action.payload.stolen, newImages: [], list: [] };
    case EDIT_KITBAG_STOLEN:
      return { ...state, current: action.payload, newImages: [] };
    case DELETE_KITBAG_STOLEN:
      return { ...state };
    case FETCH_KITBAG_STOLENS:
      return {
        ...state,
        list: action.payload.stolens,
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
