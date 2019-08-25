// import API from '../helpers/api'

// export const fetchMarketTrades = (search = '', by = 'all', page = 1, pagesize = 24) =>  async dispatch => {
//   const response = await API.get('/market/trade', {
//     params: { search, by, page, pagesize }
//   });

//   dispatch({ type: 'FETCH_MARKET_TRADES', payload: response.data });
// };

// export const fetchMarketTrade = (id) =>  async dispatch => {
//   const response = await API.get(`/market/trade/${id}`);

//   dispatch({ type: 'FETCH_MARKET_TRADE', payload: response.data });
// };

// export const fetchMarketWanteds = (search = '', by = 'all', page = 1, pagesize = 24) =>  async dispatch => {
//   const response = await API.get('/market/wanted', {
//     params: { search, by, page, pagesize }
//   });

//   dispatch({ type: 'FETCH_MARKET_TRADES', payload: response.data });
// };

// export const fetchMarketWanted = (id) =>  async dispatch => {
//   const response = await API.get(`/market/wanted/${id}`);

//   dispatch({ type: 'FETCH_MARKET_TRADE', payload: response.data });
// };

// export const fetchMarketStolens = (search = '', by = 'all', page = 1, pagesize = 24) =>  async dispatch => {
//   const response = await API.get('/market/stolen', {
//     params: { search, by, page, pagesize }
//   });

//   dispatch({ type: 'FETCH_MARKET_TRADES', payload: response.data });
// };

// export const fetchMarketStolen = (id) =>  async dispatch => {
//   const response = await API.get(`/market/stolen/${id}`);

//   dispatch({ type: 'FETCH_MARKET_TRADE', payload: response.data });
// };
