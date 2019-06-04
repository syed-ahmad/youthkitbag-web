import { combineReducers } from 'redux';
import kitbagKitsReducer from './kitbagKitsReducer';

export default combineReducers({
  kitbagKits: kitbagKitsReducer
});