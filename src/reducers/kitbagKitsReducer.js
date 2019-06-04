export default (state = { kit: {}, kits: [], filter: {}, pagination: {} }, action) => {
  switch (action.type) {
    case 'FETCH_KITBAG_KITS':
      return action.payload;
    case 'FETCH_KITBAG_KIT':
      return action.payload;
    default:
      return state;
  }
};