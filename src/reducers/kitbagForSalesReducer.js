export default (state = { forsale: {}, forsales: [], filter: {}, pagination: {} }, action) => {
  switch (action.type) {
    case 'FETCH_KITBAG_FORSALES':
      return action.payload;
    case 'FETCH_KITBAG_FORSALE':
      return action.payload;
    default:
      return state;
  }
};