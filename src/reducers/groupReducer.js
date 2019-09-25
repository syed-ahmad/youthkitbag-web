import { FETCH_GROUPS, FETCH_GROUP, FETCH_GROUP_MEMBERS, ADD_IMAGE, LOGOUT, CREATE_GROUP, EDIT_GROUP } from '../actions/types';

const initialState = { current: {}, newImages: [], list: [], members: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUPS:
      return { current: {}, newImages: [], list: action.payload.groups, members: [] };
    case FETCH_GROUP:
      return { current: action.payload, newImages: [], list: [], members: [] };
    case CREATE_GROUP:
    case EDIT_GROUP:
      return { current: action.payload.kit, newImages: [], list: [], members: [] };
    case FETCH_GROUP_MEMBERS:
      return { ...state, members: action.payload };
    case ADD_IMAGE:
      return { ...state, newImages: [...state.newImages, action.payload.photo] };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};