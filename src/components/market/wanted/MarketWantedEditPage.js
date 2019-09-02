import React, { useState, useEffect } from 'react';
import { connect, } from 'react-redux';
import { fetchMarketWanted } from '../../../actions/MarketWantedActions';
import MarketWantedForm from './MarketWantedForm';
import Title from '../../includes/Title';

const mapStateToProps = state => ({
  current: state.kitbag.wanted.current
});

const mapDispatchToProps = {
  fetchMarketWanted
}

const MarketWantedEditPage = (props) => {

  const { current, fetchMarketWanted, match } = props;

  const wantedId = match.params.id;

  const [wanted, setWanted] = useState({
    title: 'Loading requested item of wanted ...',
    subtitle: '',
    description: '',
    condition: 'Used',
    askingPrice: 0.00,
    location: {
      coordinates: ''
    },
    wantedd: {
      wanteddOn: '',
      toUserId: '',
      wantedPrice: 0,
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
    fetchMarketWanted(wantedId);
  }, [fetchMarketWanted, wantedId]);
  
  useEffect(() => {
    if (current && current._id) {
      const newWanted = {
        ...current,
        groups: current.groups.map(g => {
          let group = {...g};
          group.available = g.available ? g.available.toString().substring(0,10) : '';
          return group;
        }),
        imagesToUpload: 0
      };
      setWanted(newWanted);  
    }
  }, [current]);
  
  return (
    <div>
      <Title title={!wanted ? 'Loading...' : wanted.title} />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <MarketWantedForm wanted={wanted} />
        </div>
      </section>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(MarketWantedEditPage);
