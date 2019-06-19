import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Title from '../../includes/Title';

class KitCreate extends React.Component {

  renderTextInput({ input, label }) {
    return (
      <div className="form-group row">
        <label for="title" className="col-sm-2 col-form-label">{label}</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" {...input} />
          <div className="invalid-feedback"></div>
        </div>
      </div>
    );
  }

  renderImageSelect({ input, label }) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Images</label>
        <div className="col-sm-10">
          <div className="custom-file">
            <input type="file" multiple className="custom-file-input" id="images" aria-describedby="images" {...input} />
            <label className="custom-file-label" for="images">Choose image(s)</label>
          </div>
        </div>
      </div>
    );
  }

  renderTextArea({ input, label }) {
    return (
      <div className="form-group row">
        <label for="description" className="col-sm-2 col-form-label">{label}</label>
        <div className="col-sm-10">
          <textarea className="form-control" rows="5" {...input}></textarea>
          <div className="invalid-feedback"></div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Title title="Create new kit" />
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
                  <Field name="title" component={this.renderTextInput} label="Title" id="title" aria-describedby="title" required="required" aria-required="true" />
                  <Field name="subtitle" component={this.renderTextInput} label="Subtitle (optional)" id="subtitle" aria-describedby="subtitle" />
                  <Field name="photos" component={this.renderImageSelect} label="Images" />
                  <Field name="description" component={this.renderTextArea} label="Description" id="description" aria-describedby="description" />
                  <div className="form-group row">
                    <label for="status" className="col-sm-2 col-form-label">Status</label>
                    <div className="col-sm-10">
                      <select className="custom-select" id="status" name="status">
                        <option value=""  ></option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="security" className="col-sm-2 col-form-label">Security (optional)</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="security" name="security" aria-describedby="security" value="" />
                    </div>
                  </div>
                  <hr />
                  <h3 className="h6">Purchased (all optional)</h3>
                    <div className="form-row">
                      <div className="form-group col-sm-4">
                        <label className="d-none d-sm-block" for="purchasesfrom">From</label>
                        <input type="text" className="form-control" id="purchasesfrom" name="purchases" aria-describedby="purchasesfrom" value="" />
                      </div>
                      <div className="form-group col-sm-2">
                        <label className="d-none d-sm-block" for="purchasesquantity">Quantity</label>
                        <input type="number" className="form-control" id="purchasesquantity" name="purchases" step="1" aria-describedby="purchasesquantity" value="" />
                      </div>
                      <div className="form-group col-sm-4">
                        <label className="d-none d-sm-block" for="purchasesondate">On</label>
                        <input type="date" className="form-control" id="purchasesondate" name="purchases" aria-describedby="purchasesondate" value="" />
                      </div>
                      <div className="form-group col-sm-2">
                        <label className="d-none d-sm-block" for="purchasesprice">Price</label>
                        <input type="number" className="form-control" id="purchasesprice" name="purchases" step=".01" aria-describedby="purchasesprice" value="" />
                      </div>
                    </div>
                    <hr />
                    <h3 className="h6">In Bags / Storage Locations (all optional)</h3>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="keptInbag" name="keptInbag" />
                        <label className="form-check-label" for="keptInbag">Kept in kitbag / Stored in a location</label>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-sm-5">
                        <label className="d-none d-sm-block" for="inbaglocation">Location</label>
                        <label className="d-sm-none" for="inbaglocation">Location, Condition, Quantity </label>
                        <input type="text" className="form-control" id="inbaglocation" name="inbag" aria-describedby="inbaglocation" value="" />
                      </div>
                      <div className="form-group col-sm-4">
                        <label className="d-none d-sm-block" for="inbagcondition">Condition</label>
                        <select className="custom-select" id="inbagcondition" name="inbag">
                          <option value="used" >Used</option>
                          <option value="new" >New</option>
                          <option value="almostnew" >Almost New</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="form-group col-sm-3">
                        <label className="d-none d-sm-block" for="inbagquantity">Quantity</label>
                        <input type="number" className="form-control" id="inbagquantity" name="inbag" step="1" aria-describedby="inbagquantity" value="" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="warning" className="col-sm-4 col-form-label">Warning Level</label>
                      <div className="col-sm-8">
                        <input type="number" className="form-control" id="warning" name="warning" aria-describedby="warning" step="1" value="" />
                      </div>
                    </div>
                    <hr />
                    <h3 className="h6">Categorise (all optional)</h3>
                    <small id="categoryhelp" className="form-text text-muted form-control-help">You can add activity names or personal tags to your kit. Enter names separate by commas. (e.g. football, cycling)</small>
                    <div className="form-group row">
                      <label for="activitys" className="col-sm-2 col-form-label">Activities</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" id="activitys" name="activitys" aria-describedby="activitys" value="" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label for="tags" className="col-sm-2 col-form-label">Tags</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" id="tags" name="tags" aria-describedby="tags" value="" />
                      </div>
                    </div>
                    <div className="form-group row mb-0">
                      <label className="col-sm-2" for="active">Active</label>
                      <div className="col-1 col-sm-1">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="active" name="active" checked="" />
                        </div>
                      </div>
                      <div className="col-11 col-sm-9">
                        <div className="form-check">
                          <small id="activehelp" className="form-text text-muted form-control-help">This item is automatically switched off when status is changed to Sold, Stolen, Recycled, Trashed or Donated, but can be changed so that it remains included in standard search.</small>
                        </div>
                      </div>
                    </div>
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