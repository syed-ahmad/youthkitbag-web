import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import { editProfile } from '../../actions/UserActions';
import { addImage, clearNewImages } from '../../actions/ImageActions';
import validate from './ProfileFormValidationRules';
import { resize, dataURItoBlob } from '../../helpers/imageResize';
import { TextForm, TextAreaForm } from '../includes/forms';

const ProfileForm = ({ profile }) => {

  const dispatch = useDispatch();
  const newImages = useSelector(state => state.profile.newImages);
  const newErrors = useSelector(state => state.toast.errors);

  // ?? using hard coded constants for image sizes - should this be in image helper
  const MAXWIDTH = 720;
  const MAXHEIGHT = 720;

  const initialValues = { ...profile, profileAdmin: true, exists: false };

  const {
    setChange,
    handleChange,
    handleSubmit,
    addArrayItem,
    values,
    setValues,
    errors,
    setErrors
  } = useForm(initialValues, updateProfile, validate);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

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
              {!isReadOnly &&
                <span className="icons-top-left">
                  <span className="icon-tray-item fas fa-trash-alt img-delete" onClick={deleteImage.bind(null, images[i]._id)}></span>
                  <span className="icon-tray-item fas fa-star img-primary" onClick={setPrimaryImage.bind(null, images[i]._id)}></span>
                </span>
              }
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
    if (profile) {
      profile.topImage = profile.images && profile.images.filter(i => i.state !== 'D').length > 0 ? profile.images.filter(i => i.state !== 'D')[0].imageUrl : '/images/default.png';
      setValues(profile);
    }
  }, [profile, setValues]);

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

  function updateProfile() {
    dispatch(editProfile(values._id, values));
  }

  function isReadOnly() {
    return (!values._id || values.appAdmin) ? false : true;
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
        {!isReadOnly() &&
          <div className="form-profile row">
            <label className="col-sm-3 col-form-label">Images</label>
            <div className="col-sm-9">
              <div className="custom-file">
                <input type="file" multiple className="custom-file-input" id="photos" aria-describedby="photos" onChange={(e) => onFileChanged(e)} />
                <label className="custom-file-label" htmlFor="photos">Choose image(s)</label>
              </div>
            </div>
          </div>
        }
      </div>
      <div className="col-12 col-lg-6 order-2 order-lg-1" role="main">
        <form className="mb-3" onSubmit={handleSubmit}>
          <TextForm colFormat="3-9" label="Name" value={values.name} field="name" readOnly={isReadOnly()} handleChange={handleChange} error={errors.name} />
          <TextForm colFormat="3-9" label="Tagline" value={values.tagline} field="tagline" readOnly={isReadOnly()} handleChange={handleChange} error={errors.tagline} />
          <TextAreaForm colFormat="3-9" label="Description" value={values.description} field="description" readOnly={isReadOnly()} handleChange={handleChange} error={errors.description} />
          <TextForm colFormat="3-9" type="email" label="Email" value={values.email} field="email" readOnly={isReadOnly()} handleChange={handleChange} error={errors.email} />
          <TextForm colFormat="3-9" label="Website" value={values.website} field="website" readOnly={isReadOnly()} handleChange={handleChange} error={errors.website} />
          <TextForm colFormat="3-9" label="Location" value={values.location} field="location" readOnly={isReadOnly()} handleChange={handleChange} error={errors.location} />
          <hr />
          <TextForm colFormat="3-9" label="Activities" value={values.activitys} field="activitys" readOnly={isReadOnly()} handleChange={handleChange} error={errors.activitys} /> 
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
          {(values.appAdmin || values.profileAdmin) && 
            <div>
              <button className="btn btn-primary" type="submit">Save</button>
              <Link className="btn btn-link" to="/settings/profiles">Cancel</Link>
            </div>
          }
          {((values.appAdmin || values.profileAdmin) && values._id) && 
            <div>
              <Link className="btn btn-primary" to={`/settings/profiles/${values._id}/members`}>Members</Link>
            </div>
          }
          </form>
        </div>
      </div>
  );
}

export default ProfileForm;
