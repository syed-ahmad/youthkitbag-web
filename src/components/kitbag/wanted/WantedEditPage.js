import React, { useState, useEffect } from 'react';
import { connect, } from 'react-redux';
import { fetchKitbagWanted } from '../../../actions/KitbagWantedActions';
import WantedForm from './WantedForm';
import Title from '../../includes/Title';

const mapStateToProps = state => ({
  current: state.kitbag.wanted.current
});

const mapDispatchToProps = {
  fetchKitbagWanted
}

const WantedEditPage = (props) => {

  const { current, fetchKitbagWanted, match } = props;

  const wantedId = match.params.id;

  const [wanted, setWanted] = useState({
    title: 'Loading requested item of wanted ...',
    subtitle: '',
    description: '',
    wantedOn: '',
    location: {
      coordinates: ''
    },
    tracking: '',
    offers: [],
    activitys: '',
    security: '',
    images: [],
    recovered: false,
    sourceId: '',
    userId: '',
    topImage: '/images/default.png'
  });

  useEffect(() => {
    fetchKitbagWanted(wantedId);
  }, [fetchKitbagWanted, wantedId]);
  
  useEffect(() => {
    if (current && current._id) {
      const newWanted = {
        ...current,
        wantedOn: current.wantedOn ? current.wantedOn.toString().substring(0,10) : '',
        offers: current.offers.map(o => {
          let offer = {...o};
          offer.offeredOn = o.offeredOn ? o.offeredOn.toString().substring(0,10) : '';
          return offer;
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
          <WantedForm wanted={wanted} />
        </div>
      </section>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(WantedEditPage);
