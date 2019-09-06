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

const GroupPage = ({ current, fetchGroup, match }) => {

  const itemId = match.params.id;
  const [item, setItem] = useState({
    name: '',
    tagline: '',
    description: '',
    email: '',
    website: '',
    location: {
      coordinates: ''
    },
    activitys: '',
    images: [],
    topImage: '/images/default.png',
    imagesToUpload: 0
  });

  useEffect(() => {
    if (itemId) {
      fetchGroup(itemId);
    }
  }, [fetchGroup, itemId]);
  
  useEffect(() => {
    if (current && current._id) {
      const newItem = {
        ...current,
        imagesToUpload: 0
      };
      setItem(newItem);  
    }
  }, [current]);

  function itemIsLoding() {
    return itemId && !item._id;
  }

  function getTitle() {
    if (itemIsLoding()) {
      return 'Loading ...';
    }

    return item._id ? item.name : 'Create new item';
  }
  
  return (
    <div>
      <Title title={getTitle()} />
      <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
        <div className="container">
          <GroupForm item={item} />
        </div>
      </section>
    </div>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(GroupPage);
