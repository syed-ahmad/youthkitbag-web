import * as types from '../actions/types';

export default (state = { by: 'all', search: '', options: [ { key: 'all', value: 'All' } ] }, action) => {
  console.log('FILTER', action.type, action.payload);
  switch (action.type) {
    case types.FETCH_KITBAG_KITS: 
    case types.FETCH_KITBAG_FORSALES: 
    case types.FETCH_KITBAG_WANTEDS: 
      return { ...state, ...action.payload.filter };
    default:
      return state;
  }
} 