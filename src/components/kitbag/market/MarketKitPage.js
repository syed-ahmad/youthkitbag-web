import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchMarketKit,
  fetchMarketKitFromKit
} from '../../../actions/KitbagMarketActions';
import MarketKitForm from './MarketKitForm';
import Title from '../../includes/Title';
import Alert from '../../includes/Alert';

const mapStateToProps = state => ({
  current: state.kitbag.market.current
});

const mapDispatchToProps = {
  fetchMarketKit,
  fetchMarketKitFromKit
};

const MarketKitPage = ({
  current,
  fetchMarketKit,
  fetchMarketKitFromKit,
  match
}) => {
  const marketId = match.params.marketId;
  const kitId = match.params.kitId;
  const marketType = match.params.marketType;

  const [market, setMarketKit] = useState({
    title: '',
    subtitle: '',
    description: '',
    location: '',
    images: [],
    activitys: '',
    condition: 'used',
    askingPrice: 0.0,
    marketd: false,
    sourceId: '',
    userId: '',
    groups: [],
    marketDetails: [],
    topImage: '/images/default.png',
    imagesToUpload: 0
  });

  useEffect(() => {
    if (marketId) {
      fetchMarketKit(marketId);
    }
  }, [fetchMarketKit, marketId]);

  useEffect(() => {
    if (kitId) {
      fetchMarketKitFromKit(kitId, marketType);
    }
  }, [fetchMarketKitFromKit, kitId, marketType]);

  useEffect(() => {
    if (current && (current._id || current.sourceId)) {
      const newMarketKit = {
        ...current,
        imagesToUpload: 0
      };
      console.log('SETMARKETKIT', current);
      setMarketKit(newMarketKit);
    }
  }, [current]);

  function itemIsLoding() {
    return marketId && !market._id;
  }

  function getTitle() {
    if (itemIsLoding()) {
      return 'Loading ...';
    }

    return market._id
      ? `MarketKit: ${market.title}`
      : 'Create a new item for market';
  }

  return (
    <div>
      <Title title={getTitle()} />
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <Alert />
          <MarketKitForm market={market} />
        </div>
      </section>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketKitPage);
