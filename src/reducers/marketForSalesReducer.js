export default (state = { forsale: {}, forsales: [], filter: {}, pagination: {} }, action) => {
  switch (action.type) {
    case 'FETCH_MARKET_FORSALES':
      return action.payload;
    case 'FETCH_MARKET_FORSALE':
      return action.payload;
    default:
      return state;
  }
};