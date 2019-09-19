import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMarketWanted } from '../../../actions/MarketWantedActions';
import { resetError } from '../../../actions/ToastActions';
import MarketWantedDetails from './MarketWantedDetails';
import Title from '../../includes/Title';
import Alert from '../../includes/Alert';

const mapStateToProps = state => ({
  current: state.market.wanted.current
});

const mapDispatchToProps = {
  fetchMarketWanted, resetError
}

const MarketWantedViewPage = ({ current, fetchMarketWanted, resetError, match }) => {

  const wantedId = match.params.id;

  const [wanted, setWanted] = useState({
    title: 'Loading requested wanted item ...',
    subtitle: '',
    description: '',
    offerPrice: 0.00,
    activitys: '',
    images: [],
    topImage: '/images/default.png'
  });

  useEffect(() => {
    resetError();
  },[resetError]);

  useEffect(() => {
    fetchMarketWanted(wantedId);
  }, [fetchMarketWanted, wantedId]);
  
  useEffect(() => {
    if (current && current._id) {
      setWanted(current);  
    }
  }, [current]);
  
  return (
    <div>
      <Title title={`Wanted: ${!wanted ? 'Loading...' : wanted.title}`} />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <Alert />
          <MarketWantedDetails wanted={wanted} />
        </div>
      </section>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(MarketWantedViewPage);
