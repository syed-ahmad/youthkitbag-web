import { combineReducers } from 'redux';

import kitbagKitsReducer from './kitbagKitsReducer';
import kitbagForSalesReducer from './kitbagForSalesReducer';
import kitbagWantedsReducer from './kitbagWantedsReducer';
import marketForSalesReducer from './marketForSalesReducer';
import marketWantedsReducer from './marketWantedsReducer';
import marketStolensReducer from './marketStolensReducer';

export default combineReducers({
  kitbagKits: kitbagKitsReducer,
  kitbagForSales: kitbagForSalesReducer,
  kitbagWanteds: kitbagWantedsReducer,
  marketForSales: marketForSalesReducer,
  marketWanteds: marketWantedsReducer,
  marketStolens: marketStolensReducer 
});