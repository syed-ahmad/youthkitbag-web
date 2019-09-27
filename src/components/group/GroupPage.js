import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchGroup } from "../../actions/GroupActions";
import GroupForm from "./GroupForm";
import Title from "../includes/Title";
import Alert from "../includes/Alert";

const mapStateToProps = state => ({
  current: state.group.current
});

const mapDispatchToProps = {
  fetchGroup
};

const GroupPage = ({ current, fetchGroup, match }) => {
  const { groupId } = match.params;
  const [group, setGroup] = useState({
    name: "",
    tagline: "",
    description: "",
    email: "",
    website: "",
    location: "",
    activitys: "",
    images: [],
    topImage: "/images/default.png",
    imagesToUpload: 0
  });

  useEffect(() => {
    if (groupId) {
      fetchGroup(groupId);
    }
  }, [fetchGroup, groupId]);

  useEffect(() => {
    if (current && current._id) {
      const newGroup = {
        ...current,
        imagesToUpload: 0
      };
      setGroup(newGroup);
    }
  }, [current]);

  function groupIsLoding() {
    return groupId && !group._id;
  }

  function getTitle() {
    if (groupIsLoding()) {
      return "Loading ...";
    }

    return group._id ? group.name : "Create new group";
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
          <GroupForm group={group} />
        </div>
      </section>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupPage);
