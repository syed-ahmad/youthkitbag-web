import * as types from '../actions/types';

const initialState = { currentToast: {}, currentError: {} };

export default (state = initialState, action) => {
  ////console.log('FLTER', action.type, action.payload);
  switch (action.type) {
    case types.SET_TOAST: 
      return { ...state, ...action.payload };
    case types.RESET_TOAST: 
      return { ...state, currentToast: {} };
    case types.SET_ERROR: 
      return { ...state, currentError: action.payload.data };
    case types.RESET_ERROR: 
      return { ...state, currentError: {} };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
} 