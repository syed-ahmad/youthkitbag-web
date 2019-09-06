import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import { createKitbagTrade, editKitbagTrade } from '../../../actions/KitbagTradeActions';
import { addImage, clearNewImages } from '../../../actions/ImageActions';
import validate from './TradeFormValidationRules';
import { resize, dataURItoBlob } from '../../../helpers/imageResize';

const TradeForm = ({ trade }) => {

  // ?? still using redux
  const dispatch = useDispatch();
  const newImages = useSelector(state => state.kitbag.trade.newImages);

  // ?? using hard coded constants for image sizes - should this be in image helper
  const MAXWIDTH = 720;
  const MAXHEIGHT = 720;

  const initialGroup = {
    title: '',
    available: '2019-01-01'
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
  } = useForm(trade, updateTrade, validate);

  // ?? should this all be part of another component that deals with images
  function onFileChanged(event) {
    const { files } = event.target;
    if (!files.length) {
      return;
    }
    setChange('imagesToUpload', files.length);
    for (let i = 0; i < files.length; i++) {
      resize(files[i], MAXWIDTH, MAXHEIGHT, function (resizedDataUrl) {
        let formData = new FormData();
        formData.append('photo', dataURItoBlob(resizedDataUrl), files[i].name);
        dispatch(addImage(formData));
      });
    }
    return;
  }

  // ?? be more explicit in naming and push into utility
  function getArray(field) {
    if (Array.isArray(field)) {
      return field;
    }
    return field ? field.split(',') : []
  }

  // ?? part of images component
  // ?? need to provide revert for delete
  // ?? need to provide hover action
  // ?? think about accessibility and tabbing to functionality
  // ?? constants for state
  function renderSecondaryImages() {
    // ?? simplify
    if (!values || !values.images) {
      return null;
    }

    const { images } = values;
    const items = []
  
    // ?? use .map
    for (let i = 0; i < images.length; i++) {
      items.push(
        <div key={`image${i}`} className="carousel-thumbnail d-inline-flex">
          { images[i].state !== 'D' && 
            <React.Fragment>
              <span className="icons-top-left">
                <span className="icon-tray-item fas fa-trash-alt img-delete" onClick={deleteImage.bind(null, images[i]._id)}></span>
                <span className="icon-tray-item fas fa-star img-primary" onClick={setPrimaryImage.bind(null, images[i]._id)}></span>
              </span>
              <img className="img-fluid mb-3 img-link mini-img mr-1" src={images[i].imageUrl} alt="" role="presentation" onClick={renderTopImage.bind(null, images[i].imageUrl)} />
            </React.Fragment>
          }
          { images[i].state === 'D' && 
            <React.Fragment>
              <span className="icons-top-left">
                <span className="icon-tray-item fas fa-undo img-delete" onClick={reinstateImage.bind(null, images[i]._id)}></span>
              </span>
              <img className="img-fluid mb-3 img-link mini-img mr-1" src={images[i].imageUrl} alt="" role="presentation" />
            </React.Fragment>
          }
        </div>
      )
    }
  
    return (
      <div>
        {items}
      </div>
    )
  }

  function renderTopImage(src) {
    setChange('topImage', src);
  }

  function deleteImage(id) {
    if (id && values.images) {
      let images = values.images.map(i => {
        if (i._id === id) {
          i.state ='D';
        }
        return i;
      });
      setChange('images', images);
      setChange('topImage', images && images.filter(i => i.state !== 'D').length > 0 ? images.filter(i => i.state !== 'D')[0].imageUrl : '/images/default.png');
    }
  }

  function reinstateImage(id) {
    if (id && values.images) {
      let images = values.images.map(i => {
        if (i._id === id) {
          i.state ='N';
        }
        return i;
      });
      setChange('images', images);
    }
  }

  function setPrimaryImage(id) {
    if (id && values.images) {
      const primaryImage = values.images.filter(i => i._id === id);
      const otherImages = values.images.filter(i => i._id !== id);
      const images = primaryImage.concat(otherImages);
      setChange('images', images);
      setChange('topImage', images && images.filter(i => i.state !== 'D').length > 0 ? images.filter(i => i.state !== 'D')[0].imageUrl : '/images/default.png');
    }
  }

  useEffect(() => {
    if (trade) {
      trade.topImage = trade.images && trade.images.filter(i => i.state !== 'D').length > 0 ? trade.images.filter(i => i.state !== 'D')[0].imageUrl : '/images/default.png';
      setValues(trade);
    }
  }, [trade, setValues]);

  useEffect(() => {
    if (newImages && newImages.length > 0 && newImages.length === values.imagesToUpload) {
      const imagesToAdd = [...newImages.map(i => {
        let image = {};
        image._id = i._id;
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

  function updateTrade() {
    const trade = {
      ...values, 
      activitys: getArray(values.activitys)
    };

    if (trade._id) {
      dispatch(editKitbagTrade(trade._id, trade));
    } else {
      dispatch(createKitbagTrade(trade));
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
            <label htmlFor="condition" className="col-sm-3 col-form-label">Condition</label>
            <div className="col-sm-9">
              <select className="custom-select" name="condition" onChange={handleChange} onBlur={handleChange} value={values.condition} aria-describedby="condition">
                <option value="used">Used</option>
                <option value="new">New</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="askingPrice" className="col-sm-3 col-form-label">Asking Price</label>
            <div className="col-sm-9">
              <input className="form-control" name="askingPrice" type="number" step=".01" onChange={handleChange} value={values.askingPrice} aria-describedby="askingPrice" />
            </div>
          </div>
          <hr />
          <div>
            {values.groups && values.groups.map((item, index) => (
              <div className="form-row" key={index}>
                <div className="form-group col-sm-6">
                  { (index === 0) &&
                    <label className="d-none d-sm-block">Name</label>
                  }
                  <input className="form-control" name={`groups[${index}].title`} type="text" onChange={handleChange} value={values.groups[index].title} />
                </div>
                <div className="form-group col-sm-5">
                  { (index === 0) &&
                    <label className="d-none d-sm-block">Available</label>
                  }
                  <input className="form-control" name={`groups[${index}].available`} type="date" onChange={handleChange} value={values.groups[index].available} />
                </div>
                <div className="form-group col-sm-1">
                  { (index === 0) &&
                    <label className="d-none d-sm-block">Rem</label>
                  }
                  <button className="btn btn-danger" type="button" title="Remove Group" onClick={() => removeArrayItem('groups', index)}><span className="icon-tray-item fas fa-trash-alt"></span></button>
                </div>
              </div>
            ))}
            <button className="btn btn-secondary" type="button" onClick={() => addArrayItem('groups', [initialGroup])}>
              Add a new group
            </button>
          </div>
          <hr />
          <div className="form-group row">
            <label htmlFor="activitys" className="col-sm-3 col-form-label">Activities</label>
            <div className="col-sm-9">
              <input className={`form-control ${errors.activitys && 'is-invalid'}`} name="activitys" type="text" onChange={handleChange} value={values.activitys} aria-describedby="activitys" />
              {errors.activitys && (
                <div className="invalid-feedback">{errors.activitys}</div>
              )}
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
            <Link className="btn btn-link" to="/kitbag/trades">Cancel</Link>
          </div>
          </form>
        </div>
      </div>
  );
}

export default TradeForm;
