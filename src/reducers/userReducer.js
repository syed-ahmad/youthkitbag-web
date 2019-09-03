import * as types from '../actions/types';

const initialState = {};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case types.GET_USER:
      return { ...action.payload }
    case types.LOGOUT:
      return initialState;
    default:
      return state
  }
}

