import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchKitbagKit } from '../../../actions/KitbagKitActions';
import classNames from 'classnames';

import Title from '../../includes/Title';

class KitEdit extends React.Component {

  componentDidMount() {
    this.props.fetchKitbagKit(this.props.match.params.id);
  }

//   onSubmit = () => {
//     console.log('form submitetd');
//   }

//   topImage = () => {
//     return this.props.initialValues.images.length > 0 ? this.props.initialValues.images[0].imageUrl : '/images/default.png';
//   }

//   secondaryImages = () => {
//     const { images } = this.props.initialValues;

//     if (!images || images.length <= 0) {
//       return null;
//     }

//     const items = []
  
//     for (let i = 0; i < images.length; i++) {
//       items.push(<img key={`image${i}`} className="img-fluid mb-3 img-link mini-img mr-1" src={images[i].imageUrl} alt="" role="presentation" />)
//     }
  
//     return (
//       <div>
//         {items}
//       </div>
//     )
//   }

//   renderInput(formProps) {
//     const inputClasses = classNames({
//       'form-control': true,
//       'is-invalid': formProps.meta.touched && formProps.meta.invalid
//     });

//     return (
//       <div className="form-group row">
//         <label htmlFor={formProps.input.name} className="col-sm-2 col-form-label">{formProps.title}</label>
//         <div className="col-sm-10">
//             <input className={inputClasses} {...formProps.input} {...formProps} />
//             <div className="invalid-feedback">{formProps.meta.error}</div>
//         </div>
//       </div>
//     );
//   }

  render() {
    if (!this.props.kit) {
      return <div>Loading ....</div>
    }

    return (
      <div>
        <Title title={this.props.kit.title} />
        {/* <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)} initialvalues={this.props.initialValues}>
              <div className="row">
                <div className="col-12 col-lg-6 order-1 order-lg-2" role="main">
                  <div>
                    <img id="preview" className="img-fluid mb-3" src={this.topImage()} alt="" role="presentation" />
                  </div>
                  {this.secondaryImages()}
                </div>
                <div className="col-12 col-lg-6 order-2 order-lg-1" role="main">
                  <Field name="title" component={this.renderInput} title="Title" type="text" id="title" ariadescribedby="title" />
                </div>
              </div>
            </Form>
          </div>
          <div className="container">
              <div className="row">
              </div>
          </div>
        </section> */}
      </div>
    );
  }
}

//     if (!this.props.initialValues) {
//       return (
//         <div>
//         <Title title="This item is loading, be patient ..." />
//         <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
//         </section>
//       </div>
//       )
//     }


// const validate = formValues => {
//   const errors = {};

//   return errors;
// }

const mapStateToProps = (state, ownProps) => {
  return { kit: state.kitbag.kits[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchKitbagKit })(KitEdit);
