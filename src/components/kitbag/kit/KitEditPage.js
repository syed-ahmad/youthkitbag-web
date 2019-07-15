import React, { useState, useEffect } from 'react';
import { connect, } from 'react-redux';
import { fetchKitbagKit } from '../../../actions/KitbagKitActions';
import KitForm from './KitForm';
import Title from '../../includes/Title';

const mapStateToProps = state => ({
  current: state.kitbag.kits.current
});

const mapDispatchToProps = {
  fetchKitbagKit
}

const KitEditPage = (props) => {

  const { current, fetchKitbagKit, match } = props;

  const kitId = match.params.id;

  const [kit, setKit] = useState({
    title: 'Loading requested item of kit ...',
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
    topImage: '',
    images: [],
    imagesToUpload: 0
  });

  useEffect(() => {
    fetchKitbagKit(kitId);
  }, [fetchKitbagKit, kitId]);
  
  useEffect(() => {
    if (current && current._id) {
      const newKit = {
        ...current,
        purchases: current.purchases.map(p => {
          let purchase = {...p};
          purchase.ondate = p.ondate.toString().substring(0,10);
          return purchase;
        }),
        imagesToUpload: 0
      };
      setKit(newKit);  
    }
  }, [current]);
  
  return (
    <div>
      <Title title={!kit ? 'Loading...' : kit.title} />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <KitForm kit={kit} />
        </div>
      </section>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(KitEditPage);