import React from 'react';
import { connect } from 'react-redux';

class Alert extends React.Component {

  alertStyle = () => {
    const style = this.props.toast.currentStyle;
    switch (style) {
      case 'error':
        return 'alert-danger';
      case 'warning':
        return 'alert-warning';
      default:
        return 'alert-success';
    } 
  }

  render() {
    if (!this.props.toast || !this.props.toast.currentMessage)
      return null;

    return (
      <div className={`alert ${this.alertStyle()}`} role="alert">
        {this.props.toast.currentMessage}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { toast: state.toast };
}

export default connect(mapStateToProps, null)(Alert);