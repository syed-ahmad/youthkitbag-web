import { GET_USER, LOGOUT } from '../actions/types';

const initialState = { profile: {} };

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
