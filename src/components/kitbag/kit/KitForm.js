import React from 'react';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';

class KitForm extends React.Component {

  topImage = () => {
    return this.props.initialValues.images.length > 0 ? this.props.initialValues.images[0].imageUrl : '/images/default.png';
  }

  renderSecondaryImages = () => {
    const { images } = this.props.initialValues;

    if (!images || images.length <= 0) {
      return null;
    }

    const items = []
  
    for (let i = 0; i < images.length; i++) {
      items.push(<img key={`image${i}`} className="img-fluid mb-3 img-link mini-img mr-1" src={images[i].imageUrl} alt="" role="presentation" />)
    }
  
    return (
      <div>
        {items}
      </div>
    )
  }

  renderTextInput({ input, label, meta }) {
    const inputClasses = classNames({
      'form-control': true,
      'is-invalid': meta.touched && meta.invalid
    });

    return (
      <div className="form-group row">
        <label htmlFor={input.name} className="col-sm-3 col-form-label">{label}</label>
        <div className="col-sm-9">
          <input type="text" className={inputClasses} id={input.name} aria-describedby={input.name} {...input} />
          <div className="invalid-feedback">{meta.error}</div>
        </div>
      </div>
    );
  }

  renderImageSelect({ input, label, helptext }) {
    return (
      <div className="form-group row">
        <label className="col-sm-3 col-form-label">{label}</label>
        <div className="col-sm-9">
          <div className="custom-file">
            <input type="file" multiple className="custom-file-input" id={input.name} aria-describedby={input.name} {...input} />
            <label className="custom-file-label" htmlFor={input.name}>{helptext}</label>
          </div>
        </div>
      </div>
    );
  }

  renderTextArea({ input, label }) {
    return (
      <div className="form-group row">
        <label htmlFor={input.name} className="col-sm-3 col-form-label">{label}</label>
        <div className="col-sm-9">
          <textarea className="form-control" rows="5" {...input}></textarea>
          <div className="invalid-feedback"></div>
        </div>
      </div>
    );
  }

  renderOptionList({ input, label }) {
    return (
      <div className="form-group row">
        <label htmlFor={input.name} className="col-sm-3 col-form-label">{label}</label>
        <div className="col-sm-9">
          <select className="custom-select" id={input.name} {...input}>
            <option value="owned">Owned</option>
            <option value="forsale">For Sale</option>
            <option value="sold">Sold</option>
            <option value="stolen">Stolen</option>
            <option value="wanted">Wanted</option>
            <option value="recycled">Recycled</option>
            <option value="trashed">Trashed</option>
            <option value="donated">Donated</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    );
  }

  renderSlimTextInput({ input, instance, label, col, type }) {
    return (
      <div className={`form-group col-sm-${col}`}>
        { (instance === 0) &&
          <label className="d-none d-sm-block" htmlFor={input.name}>{label}</label>
        }
        <input type={type} className="form-control" id={input.name} aria-describedby={input.name} {...input} />
      </div>
    );
  }

  renderSlimOptionList({ input, instance, label, col }) {
    return (
      <div className={`form-group col-sm-${col}`}>
        { (instance === 0) &&
          <label className="d-none d-sm-block" htmlFor={input.name}>{label}</label>
        }
        <select className="custom-select" id={input.name} {...input}>
          <option value="used" >Used</option>
          <option value="new" >New</option>
          <option value="almostnew" >Almost New</option>
          <option value="other">Other</option>
        </select>
      </div>
    );
  }

  renderCheckbox({ input, label }) {
    return (
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id={input.name} {...input} />
        <label className="form-check-label" htmlFor={input.name}>{label}</label>
      </div>
    );
  }

  renderActiveCheckbox({ input, label }) {
    return (
      <div className="form-group row mb-0">
        <label className="col-sm-3" htmlFor={input.name}>{label}</label>
        <div className="col-1 col-sm-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id={input.name} {...input} />
          </div>
        </div>
        <div className="col-11 col-sm-8">
          <div className="form-check">
            <small id="activehelp" className="form-text text-muted form-control-help">This item is automatically switched off when status is changed to Sold, Stolen, Recycled, Trashed or Donated, but can be changed so that it remains included in standard search.</small>
          </div>
        </div>
      </div>
    );
  }

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form className="mb-3" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div className="row">
          <div className="col-12 col-lg-6 order-1 order-lg-2" role="main">
            <div>
              <img id="preview" className="img-fluid mb-3" src={this.topImage()} alt="" role="presentation" />
            </div>
            <div>
              {this.renderSecondaryImages()}
            </div>
          </div>
          <div className="col-12 col-lg-6 order-2 order-lg-1" role="main">
            <Field name="title" component={this.renderTextInput} label="Title" />
            <Field name="subtitle" component={this.renderTextInput} label="Subtitle (optional)" />
            {/* <Field name="photos" component={this.renderImageSelect} label="Images" helptext="Choose image(s)" /> */}
            <Field name="description" component={this.renderTextArea} label="Description" />
            <Field name="status" component={this.renderOptionList} label="Status" />
            <Field name="security" component={this.renderTextInput} label="Security (optional)" />
            <hr />
            <h3 className="h6">Purchased</h3>
              <div className="form-row">
                <Field name="purchases[0].from" instance="0" component={this.renderSlimTextInput} col="4" label="From" type="text" />
                <Field name="purchases[0].quantity" instance="0" component={this.renderSlimTextInput} col="2" label="Quantity" type="number" />
                <Field name="purchases[0].ondate" instance="0" component={this.renderSlimTextInput} col="4" label="On" type="date" />
                <Field name="purchases[0].price" instance="0" component={this.renderSlimTextInput} col="2" label="Price" type="number" step=".01" />
              </div>
              <div className="form-row">
                <Field name="purchases[1].from" instance="1" component={this.renderSlimTextInput} col="4" label="From" type="text" />
                <Field name="purchases[1].quantity" instance="1" component={this.renderSlimTextInput} col="2" label="Quantity" type="number" />
                <Field name="purchases[1].ondate" instance="1" component={this.renderSlimTextInput} col="4" label="On" type="date" />
                <Field name="purchases[1].price" instance="1" component={this.renderSlimTextInput} col="2" label="Price" type="number" step=".01" />
              </div>
              <div className="form-row">
                <Field name="purchases[2].from" instance="2" component={this.renderSlimTextInput} col="4" label="From" type="text" />
                <Field name="purchases[2].quantity" instance="2" component={this.renderSlimTextInput} col="2" label="Quantity" type="number" />
                <Field name="purchases[2].ondate" instance="2" component={this.renderSlimTextInput} col="4" label="On" type="date" />
                <Field name="purchases[2].price" instance="2" component={this.renderSlimTextInput} col="2" label="Price" type="number" step=".01" />
              </div>
              <div className="form-row">
                <Field name="purchases[3].from" instance="3" component={this.renderSlimTextInput} col="4" label="From" type="text" />
                <Field name="purchases[3].quantity" instance="3" component={this.renderSlimTextInput} col="2" label="Quantity" type="number" />
                <Field name="purchases[3].ondate" instance="3" component={this.renderSlimTextInput} col="4" label="On" type="date" />
                <Field name="purchases[3].price" instance="3" component={this.renderSlimTextInput} col="2" label="Price" type="number" step=".01" />
              </div>
              <div className="form-row">
                <Field name="purchases[4].from" instance="4" component={this.renderSlimTextInput} col="4" label="From" type="text" />
                <Field name="purchases[4].quantity" instance="4" component={this.renderSlimTextInput} col="2" label="Quantity" type="number" />
                <Field name="purchases[4].ondate" instance="4" component={this.renderSlimTextInput} col="4" label="On" type="date" />
                <Field name="purchases[4].price" instance="4" component={this.renderSlimTextInput} col="2" label="Price" type="number" step=".01" />
              </div>
              <hr />
              <h3 className="h6">In Bags / Storage Locations (all optional)</h3>
              <div className="form-row">
                <Field name="inbag[0].location" instance="0" component={this.renderSlimTextInput} col="5" label="Location" type="text" />
                <Field name="inbag[0].condition" instance="0" component={this.renderSlimOptionList} col="4" label="Condition" />
                <Field name="inbag[0].quantity" instance="0" component={this.renderSlimTextInput} col="3" label="Quantity" type="number" />
              </div>
              <div className="form-row">
                <Field name="inbag[1].location" instance="1" component={this.renderSlimTextInput} col="5" label="Location" type="text" />
                <Field name="inbag[1].condition" instance="1" component={this.renderSlimOptionList} col="4" label="Condition" />
                <Field name="inbag[1].quantity" instance="1" component={this.renderSlimTextInput} col="3" label="Quantity" type="number" />
              </div>
              <div className="form-row">
                <Field name="inbag[2].location" instance="2" component={this.renderSlimTextInput} col="5" label="Location" type="text" />
                <Field name="inbag[2].condition" instance="2" component={this.renderSlimOptionList} col="4" label="Condition" />
                <Field name="inbag[2].quantity" instance="2" component={this.renderSlimTextInput} col="3" label="Quantity" type="number" />
              </div>
              <div className="form-row">
                <Field name="inbag[3].location" instance="3" component={this.renderSlimTextInput} col="5" label="Location" type="text" />
                <Field name="inbag[3].condition" instance="3" component={this.renderSlimOptionList} col="4" label="Condition" />
                <Field name="inbag[3].quantity" instance="3" component={this.renderSlimTextInput} col="3" label="Quantity" type="number" />
              </div>
              <div className="form-row">
                <Field name="inbag[4].location" instance="4" component={this.renderSlimTextInput} col="5" label="Location" type="text" />
                <Field name="inbag[4].condition" instance="4" component={this.renderSlimOptionList} col="4" label="Condition" />
                <Field name="inbag[4].quantity" instance="4" component={this.renderSlimTextInput} col="3" label="Quantity" type="number" />
              </div>
              <Field name="warning" component={this.renderTextInput} label="Warning Level" type="number" step="1" />
              <hr />
              <h3 className="h6">Categorise (all optional)</h3>
              <small id="categoryhelp" className="form-text text-muted form-control-help">You can add activity names or personal tags to your kit. Enter names separate by commas. (e.g. football, cycling)</small>
              <Field name="activitys" component={this.renderTextInput} label="Activities" />
              <Field name="tags" component={this.renderTextInput} label="Tags" />
              <Field name="active" component={this.renderActiveCheckbox} label="Active" />
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12 col-lg-6" role="main">
              <button className="btn btn-primary" type="submit">Add Kit</button>
            </div>
          </div>
        </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'Please enter a title';
  }

  return errors;
}

export default reduxForm({ form: 'kitForm', validate })(KitForm);
