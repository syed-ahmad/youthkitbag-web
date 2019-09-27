import { combineReducers } from 'redux';

import kitbagKitReducer from './kitbagKitReducer';
import kitbagTradeReducer from './kitbagTradeReducer';
import kitbagWantedReducer from './kitbagWantedReducer';
import kitbagStolenReducer from './kitbagStolenReducer';

export default combineReducers({
  kit: kitbagKitReducer,
  trade: kitbagTradeReducer,
  wanted: kitbagWantedReducer,
  stolen: kitbagStolenReducer
});
