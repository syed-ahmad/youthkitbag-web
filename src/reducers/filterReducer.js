import * as types from '../actions/types';

export default (state = { by: '', search: '' }, action) => {
  console.log('FILTER', action.type, action.payload);
  switch (action.type) {
    case types.FETCH_KITBAG_KITS:
      return { ...state, ...action.payload.filter };
    default:
      return state;
  }
} 