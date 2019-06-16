import {
  GET_USER,
} from '../actions/types';

const initialState = {}

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}

