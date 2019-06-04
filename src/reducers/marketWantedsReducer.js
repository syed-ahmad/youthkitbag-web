export default (state = { wanted: {}, wanteds: [], filter: {}, pagination: {} }, action) => {
  switch (action.type) {
    case 'FETCH_MARKET_WANTEDS':
      return action.payload;
    case 'FETCH_MARKET_WANTED':
      return action.payload;
    default:
      return state;
  }
};