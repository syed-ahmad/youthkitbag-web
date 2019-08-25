import { combineReducers } from 'redux';

import kitbagKitReducer from './kitbagKitReducer';
import kitbagTradeReducer from './kitbagTradeReducer';
import kitbagWantedReducer from './kitbagWantedReducer';

export default combineReducers({
  kit: kitbagKitReducer,
  trade: kitbagTradeReducer,
  wanted: kitbagWantedReducer 
});