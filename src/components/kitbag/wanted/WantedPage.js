import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchKitbagWanted,
  fetchKitbagWantedFromKit
} from '../../../actions/KitbagWantedActions';
import WantedForm from './WantedForm';
import Title from '../../includes/Title';
import Alert from '../../includes/Alert';

const mapStateToProps = state => ({
  current: state.kitbag.wanted.current
});

const mapDispatchToProps = {
  fetchKitbagWanted,
  fetchKitbagWantedFromKit
};

const WantedPage = ({
  current,
  fetchKitbagWanted,
  fetchKitbagWantedFromKit,
  match
}) => {
  const { wantedId, kitId } = match.params;

  const [wanted, setWanted] = useState({
    title: '',
    subtitle: '',
    description: '',
    offerPrice: 0.0,
    location: '',
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
      const newWanted = {
        ...current,
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
      <section
        id="main"
        className="container-fluid"
        aria-label="main body of content plus related links and features"
      >
        <div className="container">
          <Alert />
          <WantedForm wanted={wanted} />
        </div>
      </section>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WantedPage);
