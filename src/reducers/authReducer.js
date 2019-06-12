import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  givenName: null,
  email: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload.userId, givenName: action.payload.givenName, email: action.payload.email };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null, givenName: null, email: null };
    default:
      return state;
  }
};