import React, { useState, useEffect } from 'react';
import { connect, } from 'react-redux';
import { fetchMarketTrade } from '../../../actions/MarketTradeActions';
import MarketTradeForm from './MarketTradeForm';
import Title from '../../includes/Title';

const mapStateToProps = state => ({
  current: state.kitbag.trade.current
});

const mapDispatchToProps = {
  fetchMarketTrade
}

const MarketTradeEditPage = (props) => {

  const { current, fetchMarketTrade, match } = props;

  const tradeId = match.params.id;

  const [trade, setTrade] = useState({
    title: 'Loading requested item of trade ...',
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
    topImage: '/images/default.png'
  });

  useEffect(() => {
    fetchMarketTrade(tradeId);
  }, [fetchMarketTrade, tradeId]);
  
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
  
  return (
    <div>
      <Title title={!trade ? 'Loading...' : trade.title} />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <MarketTradeForm trade={trade} />
        </div>
      </section>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(MarketTradeEditPage);
