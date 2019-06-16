import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import userReducer from './userReducer';
import kitbagReducer from './kitbagReducer';
import marketReducer from './marketReducer';

export default combineReducers({
  auth: authReducer, 
  user: userReducer,
  kitbag: kitbagReducer,
  market: marketReducer,
  form: formReducer
});