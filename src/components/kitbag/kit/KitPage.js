import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, } from 'react-redux';
import { fetchKitbagKit } from '../../../actions/KitbagKitActions';
import KitForm from './KitForm';
import Title from '../../includes/Title';

const mapStateToProps = state => ({
  current: state.kitbag.kit.current
});

const mapDispatchToProps = {
  fetchKitbagKit
}

const KitPage = ({ current, fetchKitbagKit, match }) => {

  const kitId = match.params.id;
  const [kit, setKit] = useState({
    title: '',
    subtitle: '',
    description: '',
    status: 'Owned',
    purchases: [],
    inbag: [],
    security: [],
    warning: 0,
    activitys: '',
    tags: '',
    active: 'on',
    images: [],
    topImage: '/images/default.png',
    imagesToUpload: 0
  });

  useEffect(() => {
    if (kitId) {
      fetchKitbagKit(kitId);
    }
  }, [fetchKitbagKit, kitId]);
  
  useEffect(() => {
    if (current && current._id) {
      const newKit = {
        ...current,
        purchases: current.purchases.map(p => {
          let purchase = {...p};
          purchase.ondate = p.ondate ? p.ondate.toString().substring(0,10) : '';
          return purchase;
        }),
        imagesToUpload: 0
      };
      setKit(newKit);  
    }
  }, [current]);
  
  function itemIsLoding() {
    return kitId && !kit._id;
  }

  function getTitle() {
    if (itemIsLoding()) {
      return 'Loading ...';
    }

    return kit._id ? kit.title : 'Create new kit';
  }

  return (
    <div>
      <Title title={getTitle()} />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          {kitId && 
            <div className="row">
              <div className="col-12 col-sm-3 mb-3 d-flex justify-content-end">
              <Link to={`/kitbag/trades/add/${kitId}`} className="btn btn-primary">Trade</Link>
              <Link to={`/kitbag/wanteds/add/${kitId}`} className="btn btn-secondary">Wanted</Link>
              <Link to={`/kitbag/stolens/add/${kitId}`} className="btn btn-danger">Stolen</Link>
              </div>
            </div>
          }
          <KitForm kit={kit} />
        </div>
      </section>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(KitPage);
