export default (state = { current: {}, items: [], filter: {}, pagination: {} }, action) => {
  //console.log('KBFSALE', action.type, action.payload);
  switch (action.type) {
    case 'FETCH_KITBAG_FORSALES':
      return { ...state, items: action.payload.kits, filter: action.payload.filter, pagination: action.payload.pagination };
    case 'FETCH_KITBAG_FORSALE':
      return { ...state, current: action.payload };
    default:
      return state;
  }
};