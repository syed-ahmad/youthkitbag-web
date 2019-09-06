import React from 'react';
import { connect, } from 'react-redux';
import { fetchKitbagTrade } from '../../../actions/KitbagTradeActions';
import TradeForm from './TradeForm';
import ItemPage from '../../includes/ItemPage';

const mapDispatchToProps = {
  fetchKitbagTrade
}

const mapStateToProps = state => ({
  current: state.kitbag.trade.current
});

const TradePage = ({current, match, fetchKitBagTrade}) => {

  const itemId = match.params.id;

  const initialState = {
    title: '',
    subtitle: '',
    description: '',
    condition: 'Used',
    askingPrice: 0.00,
    location: {
      coordinates: ''
    },
    tradeDetails: {
      tradedOn: '',
      toUserId: '',
      tradePrice: 0,
      complete: false
    },
    traded: false,
    activitys: '',
    groups: [],
    images: [],
    sourceId: '',
    userId: '',
    topImage: ''
  };

  return (
    <ItemPage form={TradeForm} fetch={fetchKitBagTrade} initialState={initialState} id={itemId} current={current} />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TradePage);
