import _ from 'lodash';
import * as types from '../actions/types';

export default (state = {}, action) => {
  console.log('KBKIT', action.type, action.payload);
  switch (action.type) {
    case types.FETCH_KITBAG_KIT:
      return { ...state, [action.payload._id]: action.payload };
    case types.CREATE_KITBAG_KIT:
      return { ...state, [action.payload._id]: action.payload };
    case types.EDIT_KITBAG_KIT:
      return { ...state, [action.payload._id]: action.payload };
    case types.DELETE_KITBAG_KIT:
      return _.omit(state, action.payload);  
    case types.FETCH_KITBAG_KITS:
      return { ...state, ..._.mapKeys(action.payload.kits, '_id') };
    default:
      return state;
  }
};