import * as types from '../actions/types';

const initialState = {current: {}, newImages: [], list: [] };

export default (state = initialState, action) => {
  ////console.log('KBKIT', action.type, action.payload);
  switch (action.type) {
    case types.FETCH_KITBAG_KIT:
      return { ...state, current: action.payload, newImages: [] };
    case types.CREATE_KITBAG_KIT:
      return { ...state, current: action.payload, newImages: [] };
    case types.EDIT_KITBAG_KIT:
      return { ...state, current: action.payload, newImages: [] };
    // case types.DELETE_KITBAG_KIT:
    //   return _.omit(state, action.payload);  
    // case types.FETCH_KITBAG_KITS:
    //   return { ..._.mapKeys(action.payload.kits, '_id') };
    case types.FETCH_KITBAG_KITS:
      return { ...state, list: action.payload.kits, current: {}, newImages: [] };
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