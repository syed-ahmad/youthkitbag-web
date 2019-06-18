import _ from 'lodash';
import { CREATE_KITBAG_KIT, FETCH_KITBAG_KITS, FETCH_KITBAG_KIT, EDIT_KITBAG_KIT, DELETE_KITBAG_KIT } from '../actions/types';

export default (state = {}, action) => {
  console.log('KBKIT', action.type, action.payload);
  switch (action.type) {
    case FETCH_KITBAG_KIT:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_KITBAG_KIT:
      return { ...state, [action.payload._id]: action.payload };
    case EDIT_KITBAG_KIT:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_KITBAG_KIT:
      return _.omit(state, action.payload);  
    case FETCH_KITBAG_KITS:
      return { ...state, ..._.mapKeys(action.payload.kits, '_id'), filter: action.payload.filter, pagination: action.payload.pagination };
//      return { ...state, items: action.payload.kits, filter: action.payload.filter, pagination: action.payload.pagination };
    default:
      return state;
  }
};