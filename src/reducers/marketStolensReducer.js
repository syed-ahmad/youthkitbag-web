export default (state = { current: {}, items: [], filter: {}, pagination: {} }, action) => {
  //console.log('MKTSTOLEN', action.type, action.payload);
  switch (action.type) {
    case 'FETCH_MARKET_STOLENS':
      return { ...state, items: action.payload.kits, filter: action.payload.filter, pagination: action.payload.pagination };
    case 'FETCH_MARKET_STOLEN':
      return { ...state, current: action.payload };
    default:
      return state;
  }
};