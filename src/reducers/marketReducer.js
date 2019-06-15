import { combineReducers } from 'redux';

import marketForSalesReducer from './marketForSalesReducer';
import marketWantedsReducer from './marketWantedsReducer';
import marketStolensReducer from './marketStolensReducer';

export default combineReducers({
  forsale: marketForSalesReducer,
  wanted: marketWantedsReducer,
  stolen: marketStolensReducer 
});