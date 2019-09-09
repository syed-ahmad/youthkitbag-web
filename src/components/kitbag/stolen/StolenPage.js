import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchKitbagStolen, fetchKitbagStolenFromKit } from '../../../actions/KitbagStolenActions';
import StolenForm from './StolenForm';
import Title from '../../includes/Title';

const mapStateToProps = state => ({
  current: state.kitbag.stolen.current
});

const mapDispatchToProps = {
  fetchKitbagStolen, fetchKitbagStolenFromKit
}

const StolenPage = ({ current, fetchKitbagStolen, fetchKitbagStolenFromKit, match }) => {

  const stolenId = match.params.id;
  const kitId = match.params.kit;

  const [stolen, setStolen] = useState({
    title: '',
    subtitle: '',
    description: '',
    location: {
      coordinates: ''
    },
    images: [],
    activitys: '',
    security: '',
    stolenOn: '',
    tracking: '',
    recovered: false,
    sourceId: '',
    userId: '',
    groups: [],
    reportDetails: [],
    topImage: '/images/default.png',
    imagesToUpload: 0
  });

  useEffect(() => {
    if (stolenId) {
      fetchKitbagStolen(stolenId);
    }
  }, [fetchKitbagStolen, stolenId]);

  useEffect(() => {
    if (kitId) {
      fetchKitbagStolenFromKit(kitId);
    }
  }, [fetchKitbagStolenFromKit, kitId]);
  
  useEffect(() => {
    if (current && (current._id || current.sourceId)) {
      const newStolen = {
        ...current,
        stolenOn: current.stolenOn ? current.stolenOn.toString().substring(0,10) : '',
        reportDetails: current.reportDetails.map(r => {
          let report = {...r};
          report.reportedOn = r.reportedOn ? r.reportedOn.toString().substring(0,10) : '';
          return report;
        }),
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
  
  function itemIsLoding() {
    return stolenId && !stolen._id;
  }

  function getTitle() {
    if (itemIsLoding()) {
      return 'Loading ...';
    }

    return stolen._id ? stolen.title : 'Report a new stolen item';
  }
  
  return (
    <div>
      <Title title={getTitle()} />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <StolenForm stolen={stolen} />
        </div>
      </section>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(StolenPage);
