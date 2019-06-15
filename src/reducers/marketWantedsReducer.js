export default (state = { current: {}, items: [], filter: {}, pagination: {} }, action) => {
  switch (action.type) {
    case 'FETCH_MARKET_WANTEDS':
      return { ...state, items: action.payload.kits, filter: action.payload.filter, pagination: action.payload.pagination };
    case 'FETCH_MARKET_WANTED':
      return { ...state, current: action.payload };
    default:
      return state;
  }
};