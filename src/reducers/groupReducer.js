import { FETCH_GROUPS, FETCH_GROUP, FETCH_GROUP_MEMBERS, ADD_IMAGE, LOGOUT, CREATE_GROUP, EDIT_GROUP } from '../actions/types';

const initialState = { current: {}, newImages: [], list: [], members: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUPS:
      return { list: action.payload.groups };
    case CREATE_GROUP:
    case EDIT_GROUP:
    case FETCH_GROUP:
        return { current: action.payload };
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