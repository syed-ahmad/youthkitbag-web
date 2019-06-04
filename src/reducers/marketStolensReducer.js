export default (state = { stolen: {}, stolens: [], filter: {}, pagination: {} }, action) => {
  switch (action.type) {
    case 'FETCH_MARKET_STOLENS':
      return action.payload;
    case 'FETCH_MARKET_STOLEN':
      return action.payload;
    default:
      return state;
  }
};