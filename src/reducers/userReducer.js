import {
  GET_USER,
  LOGOUT,
  ADD_IMAGE,
  EDIT_USER_PROFILE
} from "../actions/types";

const initialState = { newImages: [] };

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...action.payload, newImages: [] };
    case EDIT_USER_PROFILE:
      return { ...state, profile: action.payload.profile };
    case ADD_IMAGE:
      return {
        ...state,
        newImages: [...state.newImages, action.payload.photo]
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
