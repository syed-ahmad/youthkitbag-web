import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { resetToast, shownToast } from '../../actions/ToastActions';

const mapStateToProps = (state) => {
  return { toast: state.toast };
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ resetToast, shownToast }, dispatch),
})

class Alert extends React.Component {

  componentWillUnmount() {
    if (this.props.toast.currentMessage) {
      this.props.toast.hasShown ? this.props.actions.resetToast() : this.props.actions.shownToast();
    }
  }  

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

export default connect(mapStateToProps, mapDispatchToProps)(Alert);