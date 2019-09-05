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

const GroupViewPage = ({ current, fetchGroup, match }) => {

  const groupId = match.params.id;
  const [group, setGroup] = useState({
    location: {
      coordinates: ''
    },
    images: [],
    topImage: '/images/default.png',
    notloaded: true
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
      setGroup(newgroup);  
    }
  }, [current]);

  function waitingForGroupToLoad() {
    return groupId && !group._id;
  }

  function getTitle() {
    if (waitingForGroupToLoad()) {
      return 'Loading ...';
    }

    return group._id ? group.name : 'Create new group';
  }
  
  return (
    <div>
      <Title title={getTitle()} />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <GroupForm group={group} />
        </div>
      </section>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(GroupViewPage);
