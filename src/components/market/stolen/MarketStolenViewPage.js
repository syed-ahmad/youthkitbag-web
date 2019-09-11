import React, { useState, useEffect } from 'react';
import { connect, } from 'react-redux';
import { fetchMarketStolen } from '../../../actions/MarketStolenActions';
import MarketStolenDetails from './MarketStolenDetails';
import Title from '../../includes/Title';

const mapStateToProps = state => ({
  current: state.kitbag.stolen.current
});

const mapDispatchToProps = {
  fetchMarketStolen
}

const MarketStolenViewPage = (props) => {

  const { current, fetchMarketStolen, match } = props;

  const stolenId = match.params.id;

  const [stolen, setStolen] = useState({
    title: 'Loading requested item of stolen ...',
    subtitle: '',
    description: '',
    condition: 'Used',
    askingPrice: 0.00,
    location: {
      coordinates: ''
    },
    stolend: {
      stolendOn: '',
      toUserId: '',
      stolenPrice: 0,
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
    fetchMarketStolen(stolenId);
  }, [fetchMarketStolen, stolenId]);
  
  useEffect(() => {
    if (current && current._id) {
      const newStolen = {
        ...current,
        groups: current.groups.map(g => {
          let group = {...g};
          group.available = g.available ? g.available.toString().substring(0,10) : '';
          return group;
        }),
        imagesToUpload: 0
      };
      setStolen(newStolen);  
    }
  }, [current]);
  
  return (
    <div>
      <Title title={!stolen ? 'Loading...' : stolen.title} />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <MarketStolenDetails stolen={stolen} />
        </div>
      </section>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(MarketStolenViewPage);
