import { combineReducers } from "redux";

import marketTradeReducer from "./marketTradeReducer";
import marketWantedReducer from "./marketWantedReducer";
import marketStolenReducer from "./marketStolenReducer";

export default combineReducers({
  trade: marketTradeReducer,
  wanted: marketWantedReducer,
  stolen: marketStolenReducer
});
