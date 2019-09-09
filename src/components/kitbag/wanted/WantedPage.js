import React, { useState, useEffect } from 'react';
import { connect, } from 'react-redux';
import { fetchKitbagWanted, fetchKitbagWantedFromKit } from '../../../actions/KitbagWantedActions';
import WantedForm from './WantedForm';
import Title from '../../includes/Title';

const mapStateToProps = state => ({
  current: state.kitbag.wanted.current
});

const mapDispatchToProps = {
  fetchKitbagWanted, fetchKitbagWantedFromKit
}

const WantedPage = ({ current, fetchKitbagWanted, fetchKitbagWantedFromKit, match }) => {

  const wantedId = match.params.id;
  const kitId = match.params.kit;

  const [wanted, setWanted] = useState({
    title: '',
    subtitle: '',
    description: '',
    offerPrice: 0.00,
    location: {
      coordinates: ''
    },
    offerDetails: [],
    obtained: false,
    activitys: '',
    groups: [],
    images: [],
    sourceId: '',
    userId: '',
    topImage: '/images/default.png',
    imagesToUpload: 0
  });

  useEffect(() => {
    if (wantedId) {
      fetchKitbagWanted(wantedId);
    }
  }, [fetchKitbagWanted, wantedId]);
  
  useEffect(() => {
    if (kitId) {
      fetchKitbagWantedFromKit(kitId);
    }
  }, [fetchKitbagWantedFromKit, kitId]);
  
  useEffect(() => {
    if (current && (current._id || current.sourceId)) {
      console.log('OFFER', current);
      const newWanted = {
        ...current,
        wantedOn: current.wantedOn ? current.wantedOn.toString().substring(0,10) : '',
        offerDetails: current.offerDetails.map(o => {
          let offer = {...o};
          offer.offeredOn = o.offeredOn ? o.offeredOn.toString().substring(0,10) : '';
          return offer;
        }),
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
  
  function itemIsLoding() {
    return wantedId && !wanted._id;
  }

  function getTitle() {
    if (itemIsLoding()) {
      return 'Loading ...';
    }

    return wanted._id ? wanted.title : 'Create a new item that you want';
  }
  
  return (
    <div>
      <Title title={getTitle()} />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <WantedForm wanted={wanted} />
        </div>
      </section>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(WantedPage);
