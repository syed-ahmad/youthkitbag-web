import React, { useState, useEffect } from 'react';
import { connect, } from 'react-redux';
import { fetchKitbagStolen } from '../../../actions/KitbagStolenActions';
import StolenForm from './StolenForm';
import Title from '../../includes/Title';

const mapStateToProps = state => ({
  current: state.kitbag.stolen.current
});

const mapDispatchToProps = {
  fetchKitbagStolen
}

const StolenPage = ({ current, fetchKitbagStolen, match }) => {

  const stolenId = match.params.id;
  const [stolen, setStolen] = useState({
    title: '',
    subtitle: '',
    description: '',
    stolenOn: '',
    location: {
      coordinates: ''
    },
    tracking: '',
    reports: [],
    activitys: '',
    security: '',
    images: [],
    recovered: false,
    sourceId: '',
    userId: '',
    topImage: ''
  });

  useEffect(() => {
    if (stolenId) {
      fetchKitbagStolen(stolenId);
    }
  }, [fetchKitbagStolen, stolenId]);
  
  useEffect(() => {
    if (current && current._id) {
      const newStolen = {
        ...current,
        stolenOn: current.stolenOn ? current.stolenOn.toString().substring(0,10) : '',
        reports: current.reports.map(r => {
          let report = {...r};
          report.reportedOn = r.reportedOn ? r.reportedOn.toString().substring(0,10) : '';
          return report;
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
