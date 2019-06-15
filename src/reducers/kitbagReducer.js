import { combineReducers } from 'redux';

import kitbagKitsReducer from './kitbagKitsReducer';
import kitbagForSalesReducer from './kitbagForSalesReducer';
import kitbagWantedsReducer from './kitbagWantedsReducer';

export default combineReducers({
  kit: kitbagKitsReducer,
  forsale: kitbagForSalesReducer,
  wanted: kitbagWantedsReducer 
});