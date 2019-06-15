export default (state = { current: {}, items: [], filter: {}, pagination: {} }, action) => {
  switch (action.type) {
    case 'FETCH_KITBAG_KITS':
      return { ...state, items: action.payload.kits, filter: action.payload.filter, pagination: action.payload.pagination };
    case 'FETCH_KITBAG_KIT':
      return { ...state, current: action.payload };
    default:
      return state;
  }
};