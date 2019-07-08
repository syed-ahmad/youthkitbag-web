import * as types from '../actions/types';

const initialState = {};

export default function authentication(state = initialState, action) {
  console.log('USER', action.type, action.payload);
  switch (action.type) {
    case types.GET_USER:
      return { ...action.payload }
    case types.LOGOUT:
      return initialState;
    default:
      return state
  }
}

