import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchMarketStolen } from '../../../actions/MarketStolenActions';
import MarketStolenDetails from './MarketStolenDetails';
import Title from '../../includes/Title';
import Alert from '../../includes/Alert';

const mapStateToProps = state => ({
  current: state.market.stolen.current
});

const mapDispatchToProps = {
  fetchMarketStolen
}

const MarketStolenViewPage = ({ current, fetchMarketStolen, match }) => {

  const stolenId = match.params.id;

  const [stolen, setStolen] = useState({
    title: 'Loading requested stolen item ...',
    subtitle: '',
    description: '',
    stolenOn: '',
    activitys: '',
    security: '',
    images: [],
    topImage: '/images/default.png'
  });
  
  useEffect(() => {
    fetchMarketStolen(stolenId);
  }, [fetchMarketStolen, stolenId]);
  
  useEffect(() => {
    if (current && current._id) {
      setStolen(current);  
    }
  }, [current]);
  
  return (
    <div>
      <Title title={`Stolen: ${!stolen ? 'Loading...' : stolen.title}`} />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <Alert />
          <MarketStolenDetails stolen={stolen} />
        </div>
      </section>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(MarketStolenViewPage);
