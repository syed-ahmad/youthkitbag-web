import { GET_USER, LOGOUT, EDIT_USER_PROFILE } from '../actions/types';

const initialState = { profile: {} };

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...action.payload };
    case EDIT_USER_PROFILE:
      return { ...state, profile: action.payload.profile };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
