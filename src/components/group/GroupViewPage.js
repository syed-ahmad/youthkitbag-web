import React, { useState, useEffect } from 'react';
import { connect, } from 'react-redux';
import { fetchGroup } from '../../actions/GroupActions';
import GroupForm from './GroupForm';
import Title from '../includes/Title';

const mapStateToProps = state => ({
  current: state.group.current
});

const mapDispatchToProps = {
  fetchGroup
}

const GroupViewPage = (props) => {

  const { current, fetchGroup, match } = props;

  const groupId = match.params.id;

  const [group, setgroup] = useState({
    name: 'Loading requested item of group ...',
    tagline: '',
    description: '',
    email: '',
    website: '',
    location: {
      coordinates: ''
    },
    activitys: '',
    images: [],
    sourceId: '',
    userId: '',
    topImage: '/images/default.png'
  });

  useEffect(() => {
    fetchGroup(groupId);
  }, [fetchGroup, groupId]);
  
  useEffect(() => {
    if (current && current._id) {
      const newgroup = {
        ...current,
        imagesToUpload: 0
      };
      setgroup(newgroup);  
    }
  }, [current]);
  
  return (
    <div>
      <Title title={!group ? 'Loading...' : group.name} />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <GroupForm group={group} />
        </div>
      </section>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(GroupViewPage);
