import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import userReducer from './userReducer';
import kitbagReducer from './kitbagReducer';
import marketReducer from './marketReducer';
import filterReducer from './filterReducer';
import paginationReducer from './paginationReducer';

export default combineReducers({
  auth: authReducer, 
  user: userReducer,
  kitbag: kitbagReducer,
  market: marketReducer,
  form: formReducer,
  filter: filterReducer,
  pagination: paginationReducer
});