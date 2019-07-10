import _ from 'lodash';
import * as types from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  //console.log('KBKIT', action.type, action.payload);
  switch (action.type) {
    case types.FETCH_KITBAG_KIT:
      return { ...state, current: action.payload };
    case types.CREATE_KITBAG_KIT:
      return { ...state, current: action.payload };
    case types.EDIT_KITBAG_KIT:
      return { ...state, current: action.payload };
    case types.DELETE_KITBAG_KIT:
      return _.omit(state, action.payload);  
    case types.FETCH_KITBAG_KITS:
      return { ..._.mapKeys(action.payload.kits, '_id') };
    case types.API_KITBAG_ERROR:
      return { ...state, error: action.payload };
    case types.LOGOUT:
      return initialState;
    default:
      return state;
  }
};