import { combineReducers } from 'redux';

import kitbagKitReducer from './kitbagKitReducer';
import kitbagMarketReducer from './kitbagMarketReducer';

export default combineReducers({
  kit: kitbagKitReducer,
  market: kitbagMarketReducer
});
