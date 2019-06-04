export default (state = { kits: [], filter: {}, pagination: {} }, action) => {
  switch (action.type) {
    case 'FETCH_KITBAG_KITS':
      return action.payload;
    default:
      return state;
  }
};