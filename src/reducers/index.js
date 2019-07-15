import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userReducer from './userReducer';
import kitbagReducer from './kitbagReducer';
import marketReducer from './marketReducer';
import filterReducer from './filterReducer';
import paginationReducer from './paginationReducer';
import toastReducer from './toastReducer';

export default combineReducers({
  auth: authReducer, 
  user: userReducer,
  kitbag: kitbagReducer,
  market: marketReducer,
  filter: filterReducer,
  pagination: paginationReducer,
  toast: toastReducer
});