import * as types from '../actions/types';

const initialState = { current: {}, newImages: [], list: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_GROUPS:
      return { ...state, list: action.payload.groups, current: {}, newImages: [] };
    case types.CREATE_GROUP:
    case types.EDIT_GROUP:
    case types.FETCH_GROUP:
      return { ...state, current: action.payload, newImages: [] };
    case types.ADD_IMAGE:
      return { ...state, newImages: [...state.newImages, action.payload.photo] };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};