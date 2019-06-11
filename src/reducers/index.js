import { combineReducers } from 'redux';

import authReducer from './authReducer';
import kitbagKitsReducer from './kitbagKitsReducer';
import kitbagForSalesReducer from './kitbagForSalesReducer';
import kitbagWantedsReducer from './kitbagWantedsReducer';
import marketForSalesReducer from './marketForSalesReducer';
import marketWantedsReducer from './marketWantedsReducer';
import marketStolensReducer from './marketStolensReducer';

export default combineReducers({
  auth: authReducer, 
  kitbagKits: kitbagKitsReducer,
  kitbagForSales: kitbagForSalesReducer,
  kitbagWanteds: kitbagWantedsReducer,
  marketForSales: marketForSalesReducer,
  marketWanteds: marketWantedsReducer,
  marketStolens: marketStolensReducer 
});