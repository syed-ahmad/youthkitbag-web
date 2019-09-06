import React, { useState, useEffect } from 'react';
import { connect, } from 'react-redux';
import { fetchKitbagTrade } from '../../../actions/KitbagTradeActions';
import TradeForm from './TradeForm';
import Title from '../../includes/Title';

const mapStateToProps = state => ({
  current: state.kitbag.trade.current
});

const mapDispatchToProps = {
  fetchKitbagTrade
}

const TradeEditPage = ({ current, fetchKitbagTrade, match }) => {

  const tradeId = match.params.id;
  const [trade, setTrade] = useState({
    title: '',
    subtitle: '',
    description: '',
    condition: 'Used',
    askingPrice: 0.00,
    location: {
      coordinates: ''
    },
    traded: {
      tradedOn: '',
      toUserId: '',
      tradePrice: 0,
      complete: false
    },
    activitys: '',
    groups: [],
    images: [],
    sourceId: '',
    userId: '',
    topImage: ''
  });

  useEffect(() => {
    if (tradeId) {
      fetchKitbagTrade(tradeId);
    }
  }, [fetchKitbagTrade, tradeId]);
  
  useEffect(() => {
    if (current && current._id) {
      const newTrade = {
        ...current,
        groups: current.groups.map(g => {
          let group = {...g};
          group.available = g.available ? g.available.toString().substring(0,10) : '';
          return group;
        }),
        imagesToUpload: 0
      };
      setTrade(newTrade);  
    }
  }, [current]);
  
  function itemIsLoding() {
    return tradeId && !trade._id;
  }

  function getTitle() {
    if (itemIsLoding()) {
      return 'Loading ...';
    }

    return trade._id ? trade.title : 'Create a new item for trade';
  }
  
  return (
    <div>
      <Title title={getTitle()} />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <TradeForm trade={trade} />
        </div>
      </section>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(TradeEditPage);
