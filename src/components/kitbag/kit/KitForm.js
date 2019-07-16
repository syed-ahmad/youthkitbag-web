import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import { createKitbagKit, editKitbagKit } from '../../../actions/KitbagKitActions';
import { addImage, clearNewImages } from '../../../actions/ImageActions';
import validate from './KitFormValidationRules';

const KitForm = ({ kit }) => {

  const dispatch = useDispatch();
  const newImages = useSelector(state => state.kitbag.kits.newImages);

  const initialValues = {
    title: '',
    subtitle: '',
    description: '',
    status: 'Owned',
    purchases: [],
    inbag: [],
    warning: 0,
    activitys: '',
    tags: '',
    security: '',
    active: 'on',
    images: [],
    topImage: '/images/default.png',
    imagesToUpload: 0
  };

  const initialPurchase = {
    from: '',
    quantity: 0,
    ondate: '2001-01-01',
    price: 0.01
  };

  const initialInbag = {
    location: '',
    condition: 'used',
    quantity: 0
  };

  const {
    setChange,
    handleChange,
    handleSubmit,
    addArrayItem,
    removeArrayItem,
    values,
    setValues,
    errors
  } = useForm(initialValues, updateKit, validate);

  function onFileChanged(event) {
    const { files } = event.target;
    if (!files.length) {
      return;
    }
    setChange('imagesToUpload', files.length);
    for (let i = 0; i < files.length; i++) {
      let formData = new FormData();
      formData.append('photo', files[i]);
      dispatch(addImage(formData));
    }
    return;
  }

  function getArray(field) {
    if (Array.isArray(field)) {
      return field;
    }
    return field ? field.split(',') : []
  }

  function renderSecondaryImages() {
    if (!values || !values.images || values.images.filter(i => i.state !== 'D').length <= 0) {
      return null;
    }

    const { images } = values;
    const items = []
  
    const activeImages = [...images.filter(i => i.state !== 'D')];
    for (let i = 0; i < activeImages.length; i++) {
      items.push(<img key={`image${i}`} className="img-fluid mb-3 img-link mini-img mr-1" src={activeImages[i].imageUrl} alt="" role="presentation" onClick={renderTopImage.bind(null, activeImages[i].imageUrl)} />)
    }
  
    return (
      <div>
        {items}
      </div>
    )
  }

  function renderTopImage(src) {
    setChange('topImage', src)
  }

  useEffect(() => {
    if (kit) {
      kit.topImage = kit.images && kit.images.filter(i => i.state !== 'D').length > 0 ? kit.images.filter(i => i.state !== 'D')[0].imageUrl : '/images/default.png';
      setValues(kit);
    }
  }, [kit, setValues]);

  useEffect(() => {
    if (newImages && newImages.length > 0 && newImages.length === values.imagesToUpload) {
      const imagesToAdd = [...newImages.map(i => {
        let image = {};
        image.photoId = i._id;
        image.image = i.image;
        image.imageUrl = i.imageUrl;
        image.state = 'N';
        return image;
      })];
      dispatch(clearNewImages());
      addArrayItem('images', imagesToAdd);
      setChange('imagesToUpload', 0);
    }
  }, [newImages, addArrayItem, setChange, values, dispatch])

  function updateKit() {
    const kit = {
      ...values, 
      tags: getArray(values.tags), 
      activitys: getArray(values.activitys),
      security: getArray(values.security),
      active: values.active === "on" || values.active
    };

    if (kit._id) {
      dispatch(editKitbagKit(kit._id, kit));
    } else {
      dispatch(createKitbagKit(kit));
    }
  }

  return (
      <div className="row">
        <div className="col-12 col-lg-6 order-1 order-lg-2" role="main">
          <div>
            <img id="preview" name="preview" className="img-fluid mb-3" src={values.topImage} alt="" role="presentation" />
          </div>
          <div>
            {renderSecondaryImages()}
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Images</label>
            <div className="col-sm-9">
              <div className="custom-file">
                <input type="file" multiple className="custom-file-input" id="photos" aria-describedby="photos" onChange={(e) => onFileChanged(e)} />
                <label className="custom-file-label" htmlFor="photos">Choose image(s)</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 order-2 order-lg-1" role="main">
        <form className="mb-3" onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="title" className="col-sm-3 col-form-label">Title</label>
            <div className="col-sm-9">
              <input className={`form-control ${errors.title && 'is-invalid'}`} name="title" type="text" onChange={handleChange} value={values.title} aria-describedby="title" />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="subtitle" className="col-sm-3 col-form-label">Subtitle</label>
            <div className="col-sm-9">
              <input className={`form-control ${errors.subtitle && 'is-invalid'}`} name="subtitle" type="text" onChange={handleChange} value={values.subtitle} aria-describedby="subtitle" />
              {errors.subtitle && (
                <div className="invalid-feedback">{errors.subtitle}</div>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
            <div className="col-sm-9">
              <textarea className={`form-control ${errors.description && 'is-invalid'}`} name="description" rows="5" onChange={handleChange} value={values.description} aria-describedby="description"></textarea>
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="status" className="col-sm-3 col-form-label">Status</label>
            <div className="col-sm-9">
              <select className="custom-select" name="status" onChange={handleChange} onBlur={handleChange} value={values.status} aria-describedby="status">
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
          <hr />
          <div>
            {values.purchases && values.purchases.map((item, index) => (
              <div className="form-row" key={index}>
                <div className="form-group col-sm-4">
                  { (index === 0) &&
                    <label className="d-none d-sm-block">Purchased from</label>
                  }
                  <input className="form-control" name={`purchases[${index}].from`} type="text" onChange={handleChange} value={values.purchases[index].from} />
                </div>
                <div className="form-group col-sm-2">
                  { (index === 0) &&
                    <label className="d-none d-sm-block">Quantity</label>
                  }
                  <input className="form-control" name={`purchases[${index}].quantity`} type="number" step="1" onChange={handleChange} value={values.purchases[index].quantity} />
                </div>
                <div className="form-group col-sm-3">
                  { (index === 0) &&
                    <label className="d-none d-sm-block">On</label>
                  }
                  <input className="form-control" name={`purchases[${index}].ondate`} type="date" onChange={handleChange} value={values.purchases[index].ondate} />
                </div>
                <div className="form-group col-sm-2">
                  { (index === 0) &&
                    <label className="d-none d-sm-block">Price</label>
                  }
                  <input className="form-control" name={`purchases[${index}].price`} type="number" step=".01" onChange={handleChange} value={values.purchases[index].price} />
                </div>
                <div className="form-group col-sm-1">
                  { (index === 0) &&
                    <label className="d-none d-sm-block">Rem</label>
                  }
                  <button className="btn btn-danger" type="button" title="Remove Purchase" onClick={() => removeArrayItem('purchases', index)}><span className="icon-tray-item fas fa-trash-alt"></span></button>
                </div>
              </div>
            ))}
            <button className="btn btn-secondary" type="button" onClick={() => addArrayItem('purchases', [initialPurchase])}>
              Add a new purchase
            </button>
          </div>
          <hr />
          <div>
            {values.inbag && values.inbag.map((item, index) => (
              <div className="form-row" key={index}>
                <div className="form-group col-sm-4">
                  { (index === 0) &&
                    <label className="d-none d-sm-block">Storage location</label>
                  }
                  <input className="form-control" name={`inbag[${index}].location`} type="text" onChange={handleChange} value={values.inbag[index].location} />
                </div>
                <div className="form-group col-sm-4">
                  { (index === 0) &&
                    <label className="d-none d-sm-block">Condition</label>
                  }
                  <select className="custom-select" name={`inbag[${index}].condition`} onChange={handleChange} onBlur={handleChange} value={values.inbag[index].condition}>
                    <option value="used" >Used</option>
                    <option value="new" >New</option>
                    <option value="almostnew" >Almost New</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group col-sm-3">
                  { (index === 0) &&
                    <label className="d-none d-sm-block">Quantity</label>
                  }
                  <input className="form-control" name={`inbag[${index}].quantity`} type="number" onChange={handleChange} value={values.inbag[index].quantity} />
                </div>
                <div className="form-group col-sm-1">
                  { (index === 0) &&
                    <label className="d-none d-sm-block">Rem</label>
                  }
                  <button className="btn btn-danger" type="button" title="Remove Purchase" onClick={() => removeArrayItem('inbag', index)}><span className="icon-tray-item fas fa-trash-alt"></span></button>
                </div>
              </div>
            ))}
            <button className="btn btn-secondary" type="button" onClick={() => addArrayItem('inbag', [initialInbag])}>
              Add a new storage location
            </button>
          </div>
          <hr />
          <div className="form-group row">
            <label htmlFor="warning" className="col-sm-3 col-form-label">Warning Level</label>
            <div className="col-sm-9">
              <input className={`form-control ${errors.warning && 'is-invalid'}`} name="warning" type="number" step="1" onChange={handleChange} value={values.warning} aria-describedby="warning" />
              {errors.warning && (
                <div className="invalid-feedback">{errors.warning}</div>
              )}
            </div>
          </div>
          <hr />
          <h3 className="h6">Categorise/Security (all optional)</h3>
          <small id="categoryhelp" className="form-text text-muted form-control-help mb-3">You can add activity names, personal tags and security numbers to your kit. Enter names separate by commas. (e.g. football, cycling)</small>
          <div className="form-group row">
            <label htmlFor="activitys" className="col-sm-3 col-form-label">Activities</label>
            <div className="col-sm-9">
              <input className={`form-control ${errors.activitys && 'is-invalid'}`} name="activitys" type="text" onChange={handleChange} value={values.activitys} aria-describedby="activitys" />
              {errors.activitys && (
                <div className="invalid-feedback">{errors.activitys}</div>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="tags" className="col-sm-3 col-form-label">Tags</label>
            <div className="col-sm-9">
              <input className={`form-control ${errors.tags && 'is-invalid'}`} name="tags" type="text" onChange={handleChange} value={values.tags} aria-describedby="tags" />
              {errors.tags && (
                <div className="invalid-feedback">{errors.tags}</div>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="security" className="col-sm-3 col-form-label">Security</label>
            <div className="col-sm-9">
              <input className={`form-control ${errors.security && 'is-invalid'}`} name="security" type="text" onChange={handleChange} value={values.security} aria-describedby="security" />
              {errors.security && (
                <div className="invalid-feedback">{errors.security}</div>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3" htmlFor="active">Active</label>
            <div className="col-1 col-sm-1">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" name="active" onChange={handleChange} checked={values.active} aria-describedby="active" />
              </div>
            </div>
            <div className="col-11 col-sm-8">
              <div className="form-check">
                <small id="activehelp" className="form-text text-muted form-control-help">This item is automatically switched off when status is changed to Sold, Stolen, Recycled, Trashed or Donated, but can be changed so that it remains included in standard search.</small>
              </div>
            </div>
          </div>
          <hr />
          <div>
            {values.images && values.images.map((item, index) => (
              <div key={`${item._id}-${index}`}>
                <input name={`images[${index}]._id`} type="hidden" value={values.images[index]._id} />
                <input name={`images[${index}].image`} type="hidden" value={values.images[index].image} />
                <input name={`images[${index}].imageUrl`} type="hidden" value={values.images[index].imageUrl} />
                <input name={`images[${index}].state`} type="hidden" value={values.images[index].state} />
                <input name={`images[${index}].photoId`} type="hidden" value={values.images[index].photoId} />
              </div>
            ))}
            {values.deletedImages && values.deletedImages.map((item, index) => (
              <div key={`${item._id}-${index}`}>
                <input name={`deletedImages[${index}]._id`} type="hidden" value={values.deletedImages[index]._id} />
              </div>
            ))}
          </div>
          <div>
            <button className="btn btn-primary" type="submit">Save</button>
            <Link className="btn btn-link" to="/kitbag/kits">Cancel</Link>
          </div>
          </form>
        </div>
      </div>
  );
}

export default KitForm;
