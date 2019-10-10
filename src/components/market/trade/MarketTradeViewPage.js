import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMarketTrade } from '../../../actions/MarketTradeActions';
import MarketTradeDetails from './MarketTradeDetails';
import Title from '../../includes/Title';
import Alert from '../../includes/Alert';

const mapStateToProps = state => ({
  current: state.market.trade.current
});

const mapDispatchToProps = {
  fetchMarketTrade
};

const MarketTradeViewPage = ({ current, fetchMarketTrade, match }) => {
  const tradeId = match.params.tradeId;

  const [trade, setTrade] = useState({
    title: 'Loading requested item of trade ...',
    subtitle: '',
    description: '',
    condition: '',
    askingPrice: 0.0,
    activitys: '',
    images: [],
    topImage: '/images/default.png'
  });

  useEffect(() => {
    fetchMarketTrade(tradeId);
  }, [fetchMarketTrade, tradeId]);

  useEffect(() => {
    if (current && current._id) {
      setTrade(current);
    }
  }, [current]);

  return (
    <div>
      <Title title={!trade ? 'Loading...' : trade.title} />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <Alert />
          <MarketTradeDetails trade={trade} />
        </div>
      </section>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketTradeViewPage);
