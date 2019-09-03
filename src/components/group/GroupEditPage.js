import React, { useState, useEffect } from 'react';
import { connect, } from 'react-redux';
import { fetchGroup } from '../../../actions/GroupActions';
import GroupForm from './GroupForm';
import Title from '../../includes/Title';

const mapStateToProps = state => ({
  current: state.kitbag.group.current
});

const mapDispatchToProps = {
  fetchGroup
}

const GroupEditPage = (props) => {

  const { current, fetchGroup, match } = props;

  const groupId = match.params.id;

  const [group, setgroup] = useState({
    title: 'Loading requested item of group ...',
    subtitle: '',
    description: '',
    condition: 'Used',
    askingPrice: 0.00,
    location: {
      coordinates: ''
    },
    activitys: '',
    groups: [],
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
        groups: current.groups.map(g => {
          let group = {...g};
          group.available = g.available ? g.available.toString().substring(0,10) : '';
          return group;
        }),
        imagesToUpload: 0
      };
      setgroup(newgroup);  
    }
  }, [current]);
  
  return (
    <div>
      <Title title={!group ? 'Loading...' : group.title} />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <GroupForm group={group} />
        </div>
      </section>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(GroupEditPage);
