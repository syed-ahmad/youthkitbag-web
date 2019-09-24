import { SET_SUCCESS, SET_WARNING, SET_ERROR, API_KITBAG_ERROR, RESET_TOAST, LOGOUT, CREATE_GROUP, CREATE_KITBAG_WANTED, CREATE_KITBAG_STOLEN, CREATE_KITBAG_TRADE, CREATE_KITBAG_KIT, DELETE_KITBAG_TRADE } from '../actions/types';

const initialState = { currentMessage: '', currentStyle: '', errors: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GROUP: 
    case CREATE_KITBAG_KIT: 
    case CREATE_KITBAG_TRADE: 
    case CREATE_KITBAG_WANTED: 
    case CREATE_KITBAG_STOLEN: 
      return { currentMessage: action.payload.message, currentStyle: 'success' };
    case SET_SUCCESS: 
      return { currentMessage: action.payload.data, currentStyle: 'success' };
    case SET_WARNING: 
      return { currentMessage: action.payload.data, currentStyle: 'warning' };
    case DELETE_KITBAG_TRADE:
      return { currentMessage: action.payload.message, currentStyle: 'warning' };
    case API_KITBAG_ERROR:
      return { currentMessage: action.payload.data.message, currentStyle: 'error', errors: action.payload.data.errors };
    case SET_ERROR: 
      return { currentMessage: action.payload.data, currentStyle: 'error' };
    case RESET_TOAST: 
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
} 