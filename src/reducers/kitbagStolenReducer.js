import * as types from '../actions/types';

const initialState = {current: {}, newImages: [], list: [] };

export default (state = initialState, action) => {
  //console.log('KBSTOLEN', action.type, action.payload);
  switch (action.type) {
    case types.FETCH_KITBAG_STOLEN:
        //console.log('FETCHSTOLEN!!!!!!!!!!!!', action.payload);
        return { ...state, current: action.payload, newImages: [] };
    case types.CREATE_KITBAG_STOLEN:
      return { ...state, current: action.payload, newImages: [] };
    case types.EDIT_KITBAG_STOLEN:
      return { ...state, current: action.payload, newImages: [] };
    // case types.DELETE_KITBAG_STOLEN:
    //   return _.omit(state, action.payload);  
    // case types.FETCH_KITBAG_STOLENS:
    //   return { ..._.mapKeys(action.payload.kits, '_id') };
    case types.FETCH_KITBAG_STOLENS:
      //console.log('FETCHSTOLENS');
      return { ...state, list: action.payload.stolens, current: {}, newImages: [] };
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