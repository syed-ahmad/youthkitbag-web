import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

class KitForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topImage: '/images/default.png',
    };

    //this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }

  renderSecondaryImages = () => {
    if (!this.props || !this.props.initialValues) {
      return null;
    }

    const { images } = this.props.initialValues;

    if (!images || images.length <= 0) {
      return null;
    }

    const items = []
  
    for (let i = 0; i < images.length; i++) {
      items.push(<img key={`image${i}`} className="img-fluid mb-3 img-link mini-img mr-1" src={images[i].imageUrl} alt="" role="presentation" onClick={this.renderTopImage.bind(null, images[i].imageUrl)} />)
    }
  
    return (
      <div>
        {items}
      </div>
    )
  }

  renderTopImage = (src) => {
    this.setState({topImage: src});
  }

  renderTextInput({ input, label, meta, type = 'text' }) {
    const inputClasses = classNames({
      'form-control': true,
      'is-invalid': meta.touched && meta.invalid
    });

    return (
      <div className="form-group row">
        <label htmlFor={input.name} className="col-sm-3 col-form-label">{label}</label>
        <div className="col-sm-9">
          <input type={type} className={inputClasses} id={input.name} aria-describedby={input.name} {...input} />
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
            <input type="file" multiple ref={this.fileInput} className="custom-file-input" id={input.name} aria-describedby={input.name} {...input} />
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

  renderPurchases = ({ fields }) => {
    return (
      <div>
        {fields.map((item, index) => (
          <div className="form-row" key={index}>
            <Field name={`${item}.from`} instance={index} component={this.renderSlimTextInput} col="4" label="Purchased from" type="text" />
            <Field name={`${item}.quantity`} instance={index} component={this.renderSlimTextInput} col="2" label="Quantity" type="number" />
            <Field name={`${item}.ondate`} instance={index} component={this.renderSlimTextInput} col="3" label="On" type="date" />
            <Field name={`${item}.price`} instance={index} component={this.renderSlimTextInput} col="2" label="Price" type="number" step=".01" />
            <div className="form-group col-sm-1">
              { (index === 0) &&
                <label className="d-none d-sm-block">Rem</label>
              }
              <button className="btn btn-danger" type="button" title="Remove Purchase" onClick={() => fields.remove(index)}><span className="icon-tray-item fas fa-trash-alt"></span></button>
            </div>
          </div>
        ))}
        <button className="btn btn-secondary" type="button" onClick={() => fields.push({})}>
          Add a new purchase
        </button>
      </div>
    );
  }

  renderInbag = ({ fields }) => {
    return (
      <div>
        {fields.map((item, index) => (
          <div className="form-row" key={index}>
            <Field name={`${item}.location`} instance={index} component={this.renderSlimTextInput} col="4" label="Storage location" type="text" />
            <Field name={`${item}.condition`} instance={index} component={this.renderSlimOptionList} col="4" label="Condition" />
            <Field name={`${item}.quantity`} instance={index} component={this.renderSlimTextInput} col="3" label="Quantity" type="number" />
            <div className="form-group col-sm-1">
              { (index === 0) &&
                <label className="d-none d-sm-block">Rem</label>
              }
              <button className="btn btn-danger" type="button" title="Remove Purchase" onClick={() => fields.remove(index)}><span className="icon-tray-item fas fa-trash-alt"></span></button>
            </div>
          </div>
        ))}
        <button className="btn btn-secondary" type="button" onClick={() => fields.push({})}>
          Add a new storage location
        </button>
      </div>
    );
  }

  onSubmit = formValues => {
   this.props.onSubmit(formValues);
  };

  componentDidMount() {
    if (this.props && this.props.initialValues && this.props.initialValues.images.length > 0) {
      this.setState({topImage: this.props.initialValues.images[0].imageUrl});
    }
  }

  render() {
    return (
      <form className="mb-3" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <div className="row">
          <div className="col-12 col-lg-6 order-1 order-lg-2" role="main">
            <div>
              <img id="preview" className="img-fluid mb-3" src={this.state.topImage} alt="" role="presentation" />
            </div>
            <div>
              {this.renderSecondaryImages()}
            </div>
          </div>
          <div className="col-12 col-lg-6 order-2 order-lg-1" role="main">
            <Field name="title" component={this.renderTextInput} label="Title" />
            <Field name="subtitle" component={this.renderTextInput} label="Subtitle (optional)" />
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Images</label>
              <div className="col-sm-9">
                <div className="custom-file">
                  <input type="file" multiple ref={this.fileInput} className="custom-file-input" id="photos" aria-describedby="photos" />
                  <label className="custom-file-label" htmlFor="photos">Choose image(s)</label>
                </div>
              </div>
            </div>
            {/* <Field name="photos" component={this.renderImageSelect} label="Images" helptext="Choose image(s)" /> */}
            <Field name="description" component={this.renderTextArea} label="Description" />
            <Field name="status" component={this.renderOptionList} label="Status" />
            <hr />
            <FieldArray name="purchases" component={this.renderPurchases} />
            <hr />
            <FieldArray name="inbag" component={this.renderInbag} />
            <hr />
            <Field name="warning" component={this.renderTextInput} label="Warning Level" type="number" step="1" />
            <hr />
            <h3 className="h6">Categorise (all optional)</h3>
            <small id="categoryhelp" className="form-text text-muted form-control-help">You can add activity names, personal tags and security references to your kit. Enter names separate by commas. (e.g. football, cycling)</small>
            <Field name="activitys" component={this.renderTextInput} label="Activities" />
            <Field name="tags" component={this.renderTextInput} label="Tags" />
            <Field name="security" component={this.renderTextInput} label="Security" />
            <Field name="active" component={this.renderActiveCheckbox} label="Active" />
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 col-lg-6" role="main">
            <button className="btn btn-primary" type="submit">Save</button>
            <Link className="btn btn-link" to="/kitbag/kits">Cancel</Link>
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
