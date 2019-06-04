export default (state = { wanted: {}, wanteds: [], filter: {}, pagination: {} }, action) => {
  switch (action.type) {
    case 'FETCH_KITBAG_WANTEDS':
      return action.payload;
    case 'FETCH_KITBAG_WANTED':
      return action.payload;
    default:
      return state;
  }
};