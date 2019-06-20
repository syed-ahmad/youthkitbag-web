import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';

import Title from '../../includes/Title';

class KitCreate extends React.Component {

  renderTextInput({ input, label, required }) {
    return (
      <div className="form-group row">
        <label for={input.name} className="col-sm-2 col-form-label">{label}</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id={input.name} aria-describedby={input.name} placeholder={label} {...input} />
          <div className="invalid-feedback"></div>
        </div>
      </div>
    );
  }

  renderImageSelect({ input, label, helptext }) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">{label}</label>
        <div className="col-sm-10">
          <div className="custom-file">
            <input type="file" multiple className="custom-file-input" id={input.name} aria-describedby={input.name} {...input} />
            <label className="custom-file-label" for={input.name}>{helptext}</label>
          </div>
        </div>
      </div>
    );
  }

  renderTextArea({ input, label }) {
    return (
      <div className="form-group row">
        <label for={input.name} className="col-sm-2 col-form-label">{label}</label>
        <div className="col-sm-10">
          <textarea className="form-control" rows="5" {...input}></textarea>
          <div className="invalid-feedback"></div>
        </div>
      </div>
    );
  }

  renderOptionList({ input, label }) {
    return (
      <div className="form-group row">
        <label for={input.name} className="col-sm-2 col-form-label">{label}</label>
        <div className="col-sm-10">
          <select className="custom-select" id={input.name} {...input}>
            <option value=""  ></option>
          </select>
        </div>
      </div>
    );
  }

  renderSlimTextInput({ input, instance, label, col, type }) {
    return (
      <div className={`form-group col-sm-${col}`}>
        { (instance == 0) &&
          <label className="d-none d-sm-block" for={input.name}>{label}</label>
        }
        <input type={type} className="form-control" id={input.name} aria-describedby={input.name} placeholder={label} {...input} />
      </div>
    );
  }

  renderSlimOptionList({ input, label, col }) {
    return (
      <div className={`form-group col-sm-${col}`}>
        <label className="d-none d-sm-block" for={input.name}>{label}</label>
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
        <label className="form-check-label" for={input.name}>{label}</label>
      </div>
    );
  }

  renderActiveCheckbox({ input, label }) {
    return (
      <div className="form-group row mb-0">
        <label className="col-sm-2" for={input.name}>{label}</label>
        <div className="col-1 col-sm-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id={input.name} {...input} />
          </div>
        </div>
        <div className="col-11 col-sm-9">
          <div className="form-check">
            <small id="activehelp" className="form-text text-muted form-control-help">This item is automatically switched off when status is changed to Sold, Stolen, Recycled, Trashed or Donated, but can be changed so that it remains included in standard search.</small>
          </div>
        </div>
      </div>
    );
  }

  onSubmit = (formValues) => {
    console.log(formValues);
  }

  render() {
    return (
      <div>
        <Title title="Create new kit" />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <div className="row">
                <div className="col-12 col-lg-6 order-1 order-lg-2" role="main">
                  <div>
                    <img id="preview" className="img-fluid mb-3" src="/images/default.png" alt="" role="presentation" />
                  </div>
                  <div>
                    <img className="img-fluid mb-3 img-link" src="" alt="" role="presentation" />
                  </div>
                </div>
                <div className="col-12 col-lg-6 order-2 order-lg-1" role="main">
                  <Field name="title" component={this.renderTextInput} label="Title" required="true" />
                  <Field name="subtitle" component={this.renderTextInput} label="Subtitle (optional)" />
                  <Field name="photos" component={this.renderImageSelect} label="Images" helptext="Choose image(s)" />
                  <Field name="description" component={this.renderTextArea} label="Description" />
                  <Field name="status" component={this.renderOptionList} label="Status" />
                  <Field name="security" component={this.renderTextInput} label="Security (optional)" />
                  <hr />
                  <h3 className="h6">Purchased (all optional)</h3>
                    <div className="form-row">
                      <Field name="purchased[0].from" instance="0" component={this.renderSlimTextInput} col="4" label="From" type="text" />
                      <Field name="purchased[0].quantity" instance="0" component={this.renderSlimTextInput} col="2" label="Quantity" type="number" />
                      <Field name="purchased[0].ondate" instance="0" component={this.renderSlimTextInput} col="4" label="On" type="date" />
                      <Field name="purchased[0].price" instance="0" component={this.renderSlimTextInput} col="2" label="Price" type="number" step=".01" />
                    </div>
                    <div className="form-row">
                      <Field name="purchased[1].from" component={this.renderSlimTextInput} col="4" label="From" type="text" />
                      <Field name="purchased[1].quantity" component={this.renderSlimTextInput} col="2" label="Quantity" type="number" />
                      <Field name="purchased[1].ondate" component={this.renderSlimTextInput} col="4" label="On" type="date" />
                      <Field name="purchased[1].price" component={this.renderSlimTextInput} col="2" label="Price" type="number" step=".01" />
                    </div>
                    <hr />
                    <h3 className="h6">In Bags / Storage Locations (all optional)</h3>
                    <div className="form-row">
                      <Field name="inbaglocation" component={this.renderSlimTextInput} col="5" label="Location" type="text" />
                      <Field name="inbagcondition" component={this.renderSlimOptionList} col="4" label="Condition" />
                      <Field name="inbagquantity" component={this.renderSlimTextInput} col="3" label="Quantity" />
                    </div>
                    <Field name="wanrning" component={this.renderTextInput} label="Warning Level" type="number" step="1" />
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
                <input type="hidden" name="kitId" value="" />
                <input type="hidden" name="_csrf" value="" />
                <button className="btn btn-primary" type="submit">Update/Add Kit</button>
              </div>
            </div>
            </form>
          </div>
          <div className="container">
              <div className="row">
              </div>
          </div>
        </section>
      </div>
    );
  }

}

export default reduxForm({ form: 'kitCreate' })(KitCreate);