import * as types from '../actions/types';

export default (state = { currentToast: {}, currentError: {} }, action) => {
  console.log('FLTER', action.type, action.payload);
  switch (action.type) {
    case types.SET_TOAST: 
      return { ...state, ...action.payload };
    case types.RESET_TOAST: 
      return { ...state, currentToast: {} };
    case types.SET_ERROR: 
      return { ...state, currentError: action.payload.data };
    case types.RESET_ERROR: 
      return { ...state, currentError: {} };
    default:
      return state;
  }
} 