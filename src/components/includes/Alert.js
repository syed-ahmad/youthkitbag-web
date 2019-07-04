import React from 'react';
import { connect } from 'react-redux';

class Alert extends React.Component {
  render() {
    if (!this.props.toast || !this.props.toast.currentError || !this.props.toast.currentError.message)
      return null;

    return (
      <div className="alert alert-danger" role="alert">
        {this.props.toast.currentError.message}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { toast: state.toast };
}

export default connect(mapStateToProps, null)(Alert);