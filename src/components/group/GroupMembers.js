import React from 'react';
import { connect } from 'react-redux';
import { fetchGroupMembers } from '../../actions';
import Title from '../includes/Title';
import Alert from '../includes/Alert';

class GroupMembers extends React.Component {

  getTitle = () => {
    console.log('display');
    if (!this.props.members) {
      return 'Loading ...';
    }
    return `Found members (${this.props.members.length})`;
  }

  componentDidMount() {
    console.log('GMBR did');
    const groupId = this.props.match.params.groupId;
    this.props.fetchGroupMembers(groupId);
  }

  componentDidUpdate(prevProps) {
    console.log('GMBR upd');
    if (this.props.location.search !== prevProps.location.search) {
      const groupId = this.props.match.params.groupId;
      this.props.fetchGroupMembers(groupId);
    }
  } 

  renderList() {
    console.log('display members');
    return this.props.members.map((item, index) => {
      return <p key={`${item._id}-${index}`}>{JSON.stringify(item)}</p>
//      return <GroupCard key={`${item._id}-${index}`} group={item}/>
    })
  }

  render() {
    console.log('display');
    return (
      <div>
        <Title title={this.getTitle()} />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <Alert />
            <div className="row">
            {this.renderList()}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { members: Object.values(state.group.members) };
}

export default connect(mapStateToProps, { fetchGroupMembers })(GroupMembers);