import youthkitbagApi from '../api/youthkitbag';

export const signIn = () => {
  return {
    type: 'SIGN_IN'
  }
};

export const signOut = () => {
  return {
    type: 'SIGN_OUT'
  }
};

export const fetchKitBagKits = (search = '', by = 'all', page = 1, pagesize = 24) =>  async dispatch => {
  const response = await youthkitbagApi.get('/kitbag/kit', {
    params: { search, by, page, pagesize }
  });

  dispatch({ type: 'FETCH_KITBAG_KITS', payload: response.data });
};

export const fetchKitBagKit = (id) =>  async dispatch => {
  const response = await youthkitbagApi.get(`/kitbag/kit/${id}`);

  dispatch({ type: 'FETCH_KITBAG_KIT', payload: response.data });
};

export const fetchKitBagForSales = (search = '', by = 'all', page = 1, pagesize = 24) =>  async dispatch => {
  const response = await youthkitbagApi.get('/kitbag/forsale', {
    params: { search, by, page, pagesize }
  });

  dispatch({ type: 'FETCH_KITBAG_FORSALES', payload: response.data });
};

export const fetchKitBagForSale = (id) =>  async dispatch => {
  const response = await youthkitbagApi.get(`/kitbag/forsale/${id}`);

  dispatch({ type: 'FETCH_KITBAG_FORSALE', payload: response.data });
};

export const fetchKitBagWanteds = (search = '', by = 'all', page = 1, pagesize = 24) =>  async dispatch => {
  const response = await youthkitbagApi.get('/kitbag/wanted', {
    params: { search, by, page, pagesize }
  });

  dispatch({ type: 'FETCH_KITBAG_WANTEDS', payload: response.data });
};

export const fetchKitBagWanted = (id) =>  async dispatch => {
  const response = await youthkitbagApi.get(`/kitbag/wanted/${id}`);

  dispatch({ type: 'FETCH_KITBAG_WANTED', payload: response.data });
};

export const fetchMarketForSales = (search = '', by = 'all', page = 1, pagesize = 24) =>  async dispatch => {
  const response = await youthkitbagApi.get('/market/forsale', {
    params: { search, by, page, pagesize }
  });

  dispatch({ type: 'FETCH_MARKET_FORSALES', payload: response.data });
};

export const fetchMarketForSale = (id) =>  async dispatch => {
  const response = await youthkitbagApi.get(`/market/forsale/${id}`);

  dispatch({ type: 'FETCH_MARKET_FORSALE', payload: response.data });
};

export const fetchMarketWanteds = (search = '', by = 'all', page = 1, pagesize = 24) =>  async dispatch => {
  const response = await youthkitbagApi.get('/market/wanted', {
    params: { search, by, page, pagesize }
  });

  dispatch({ type: 'FETCH_MARKET_FORSALES', payload: response.data });
};

export const fetchMarketWanted = (id) =>  async dispatch => {
  const response = await youthkitbagApi.get(`/market/wanted/${id}`);

  dispatch({ type: 'FETCH_MARKET_FORSALE', payload: response.data });
};

export const fetchMarketStolens = (search = '', by = 'all', page = 1, pagesize = 24) =>  async dispatch => {
  const response = await youthkitbagApi.get('/market/stolen', {
    params: { search, by, page, pagesize }
  });

  dispatch({ type: 'FETCH_MARKET_FORSALES', payload: response.data });
};

export const fetchMarketStolen = (id) =>  async dispatch => {
  const response = await youthkitbagApi.get(`/market/stolen/${id}`);

  dispatch({ type: 'FETCH_MARKET_FORSALE', payload: response.data });
};





