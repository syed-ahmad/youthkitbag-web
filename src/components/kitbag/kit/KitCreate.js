import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Title from '../../includes/Title';

class KitCreate extends React.Component {

  renderInput({ input, label, type }) {
    return <input type={type} className="form-control" id={input.name} aria-describedby={input.name} {...input} />;
  }

  renderImageSelect({ input, label, helptext }) {
    return (
      <div className="custom-file">
        <input type="file" multiple className="custom-file-input" id={input.name} aria-describedby={input.name} {...input} />
        <label className="custom-file-label" for={input.name}>{helptext}</label>
      </div>
    );
  }

  renderTextArea({ input, label }) {
    return (
      <textarea className="form-control" rows="5" {...input}></textarea>
    );
  }

  renderStatusList({ input, label }) {
    return (
      <select className="custom-select" id={input.name} {...input}>
        <option value="owned">Owned</option>
      </select>
    );
  }

  renderPurchased() {
    return (
      <div className="form-row">
        <div className="form-group col-sm-4">
          <label className="d-none d-sm-block" for="purchasedfrom">From</label>
          <Field name="purchasedfrom" component={this.renderInput} type="text" />
        </div>
        <div className="form-group col-sm-2">
          <label className="d-none d-sm-block" for="purchasedquantity">Quantity</label>
          <Field name="purchasedquantity" component={this.renderInput} col="2" type="number" />
        </div>
        <div className="form-group col-sm-4">
          <label className="d-none d-sm-block" for="purchasedondate">On</label>
          <Field name="purchasedondate" component={this.renderInput} col="4" type="date" />
        </div>
        <div className="form-group col-sm-2">
          <label className="d-none d-sm-block" for="purchasedprice">Number</label>
          <Field name="purchasedprice" component={this.renderInput} type="number" step=".01" />
        </div>
      </div>
    );
  }

  // renderSlimOptionList({ input, label, col }) {
  //   return (
  //     <div className={`form-group col-sm-${col}`}>
  //       <label className="d-none d-sm-block" for={input.name}>{label}</label>
  //       <select className="custom-select" id={input.name} {...input}>
  //         <option value="used" >Used</option>
  //         <option value="new" >New</option>
  //         <option value="almostnew" >Almost New</option>
  //         <option value="other">Other</option>
  //       </select>
  //     </div>
  //   );
  // }

  // renderCheckbox({ input, label }) {
  //   return (
  //     <div className="form-group form-check">
  //       <input type="checkbox" className="form-check-input" id={input.name} {...input} />
  //       <label className="form-check-label" for={input.name}>{label}</label>
  //     </div>
  //   );
  // }

  // renderActiveCheckbox({ input, label }) {
  //   return (
  //     <div className="form-group row mb-0">
  //       <label className="col-sm-2" for={input.name}>{label}</label>
  //       <div className="col-1 col-sm-1">
  //         <div className="form-check">
  //           <input className="form-check-input" type="checkbox" id={input.name} {...input} />
  //         </div>
  //       </div>
  //       <div className="col-11 col-sm-9">
  //         <div className="form-check">
  //           <small id="activehelp" className="form-text text-muted form-control-help">This item is automatically switched off when status is changed to Sold, Stolen, Recycled, Trashed or Donated, but can be changed so that it remains included in standard search.</small>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    return (
      <div>
        <Title title="Add new kit to kitbag" />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <form>
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
                  <div className="form-group row">
                    <label for="title" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                      <Field name="title" component={this.renderInput} type="text" />
                      <div className="invalid-feedback"></div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="subtitle" className="col-sm-2 col-form-label">Subtitle</label>
                    <div className="col-sm-10">
                      <Field name="subtitle" component={this.renderInput} type="text" />
                      <div className="invalid-feedback"></div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Images</label>
                    <div className="col-sm-10">
                      <Field name="photos" component={this.renderImageSelect} helptext="Choose image(s)" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="description" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                      <Field name="description" component={this.renderTextArea} />
                      <div className="invalid-feedback"></div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="status" className="col-sm-2 col-form-label">Status</label>
                    <div className="col-sm-10">
                      <Field name="status" component={this.renderStatusList} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="security" className="col-sm-2 col-form-label">Security</label>
                    <div className="col-sm-10">
                      <Field name="security" component={this.renderInput} type="text" />
                      <div className="invalid-feedback"></div>
                    </div>
                  </div>
                  <hr />
                  <h3 className="h6">Purchased</h3>
                  {this.renderPurchased}
                  <hr />
                  {/* 


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
                    <Field name="active" component={this.renderActiveCheckbox} label="Active" /> */}
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
        </section>
      </div>
    );
  }

}

export default reduxForm({ form: 'kitCreate' })(KitCreate);