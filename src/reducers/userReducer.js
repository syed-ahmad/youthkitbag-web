import {
  GET_USER,
} from '../actions/types';

const initialState = {}

export default function authentication(state = initialState, action) {
  console.log('USER', action.type, action.payload);
  switch (action.type) {
    case GET_USER:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}

