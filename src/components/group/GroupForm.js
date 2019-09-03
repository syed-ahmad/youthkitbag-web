import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import { createGroup, editGroup } from '../../actions/GroupActions';
import { addImage, clearNewImages } from '../../actions/ImageActions';
import validate from './GroupFormValidationRules';
import { resize, dataURItoBlob } from '../../helpers/imageResize';

const GroupForm = ({ group }) => {

  // ?? still using redux
  const dispatch = useDispatch();
  const newImages = useSelector(state => state.group.newImages);

  // ?? using hard coded constants for image sizes - should this be in image helper
  const MAXWIDTH = 720;
  const MAXHEIGHT = 720;

  // ?? set initial values - but props overrides on edit, but two new parameters of topImage and imagesToUpload
  const initialValues = {
    name: '',
    tagline: '',
    description: '',
    email: '',
    website: '',
    location: {
      coordinates: ''
    },
    activitys: '',
    images: [],
    topImage: '/images/default.png'
  };

  const {
    setChange,
    handleChange,
    handleSubmit,
    addArrayItem,
    values,
    setValues,
    errors
  } = useForm(initialValues, updateGroup, validate);

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
    if (group) {
      group.topImage = group.images && group.images.filter(i => i.state !== 'D').length > 0 ? group.images.filter(i => i.state !== 'D')[0].imageUrl : '/images/default.png';
      setValues(group);
    }
  }, [group, setValues]);

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

  function updateGroup() {
    const group = {
      ...values, 
      activitys: getArray(values.activitys)
    };

    if (group._id) {
      dispatch(editGroup(group._id, group));
    } else {
      dispatch(createGroup(group));
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
            <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
            <div className="col-sm-9">
              <input className={`form-control ${errors.name && 'is-invalid'}`} name="name" type="text" onChange={handleChange} value={values.name} aria-describedby="name" />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="tagline" className="col-sm-3 col-form-label">Tagline</label>
            <div className="col-sm-9">
              <input className={`form-control ${errors.tagline && 'is-invalid'}`} name="tagline" type="text" onChange={handleChange} value={values.tagline} aria-describedby="tagline" />
              {errors.tagline && (
                <div className="invalid-feedback">{errors.tagline}</div>
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
            <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
            <div className="col-sm-9">
              <input className={`form-control ${errors.email && 'is-invalid'}`} name="email" type="email" onChange={handleChange} value={values.email} aria-describedby="email" />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="website" className="col-sm-3 col-form-label">Website</label>
            <div className="col-sm-9">
              <input className={`form-control ${errors.website && 'is-invalid'}`} name="website" type="website" onChange={handleChange} value={values.website} aria-describedby="website" />
              {errors.website && (
                <div className="invalid-feedback">{errors.website}</div>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="location" className="col-sm-3 col-form-label">Location</label>
            <div className="col-sm-9">
              <input className={`form-control ${errors.location && 'is-invalid'}`} name="location" type="location" onChange={handleChange} value={values.location} aria-describedby="location" />
              {errors.location && (
                <div className="invalid-feedback">{errors.location}</div>
              )}
            </div>
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
            <Link className="btn btn-link" to="/settings/groups">Cancel</Link>
          </div>
          </form>
        </div>
      </div>
  );
}

export default GroupForm;