import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import {
  createKitbagWanted,
  editKitbagWanted
} from '../../../actions/KitbagWantedActions';
import { addImage, clearNewImages } from '../../../actions/ImageActions';
import validate from './WantedFormValidationRules';
import { resize, dataURItoBlob } from '../../../helpers/imageResize';
import {
  DateForm,
  TextForm,
  TextAreaForm,
  CheckboxForm,
  AddArrayButtonForm,
  RemoveArrayButtonForm
} from '../../includes/forms';

const WantedForm = ({ wanted }) => {
  const newErrors = useSelector(state => state.toast.errors);

  // ?? still using redux
  const dispatch = useDispatch();
  const newImages = useSelector(state => state.kitbag.wanted.newImages);

  // ?? using hard coded constants for image sizes - should this be in image helper
  const MAXWIDTH = 720;
  const MAXHEIGHT = 720;

  const initialOffer = {
    offeredOn: '2019-01-01',
    fromUserId: '',
    askingPrice: '',
    accepted: false
  };

  const {
    setChange,
    handleChange,
    handleSubmit,
    addArrayItem,
    removeArrayItem,
    values,
    setValues,
    errors,
    setErrors
  } = useForm(wanted, updateWanted, validate);

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
      resize(files[i], MAXWIDTH, MAXHEIGHT, function(resizedDataUrl) {
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
    return field ? field.split(',') : [];
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
    const items = [];

    // ?? use .map
    for (let i = 0; i < images.length; i++) {
      items.push(
        <div key={`image${i}`} className="carousel-thumbnail d-inline-flex">
          {images[i].state !== 'D' && (
            <React.Fragment>
              <span className="icons-top-left">
                <button
                  aria-label="Delete image"
                  className="btn btn-link p-0 icon-tray-item"
                  href="#"
                  onClick={deleteImage.bind(null, images[i]._id)}
                >
                  <i
                    aria-hidden="true"
                    className="fas fa-trash"
                    title="Delete this image?"
                  ></i>
                </button>
                <button
                  aria-label="Set as primary image"
                  className="btn btn-link p-0 icon-tray-item"
                  href="#"
                  onClick={setPrimaryImage.bind(null, images[i]._id)}
                >
                  <i
                    aria-hidden="true"
                    className="fas fa-star"
                    title="Set as primary image"
                  ></i>
                </button>
              </span>
              <img
                className="img-fluid mb-3 img-link mini-img mr-1"
                src={images[i].imageUrl}
                alt=""
                role="presentation"
                onClick={renderTopImage.bind(null, images[i].imageUrl)}
              />
            </React.Fragment>
          )}
          {images[i].state === 'D' && (
            <React.Fragment>
              <span className="icons-top-left">
                <button
                  aria-label="Undo image deletion"
                  className="btn btn-link p-0 icon-tray-item"
                  href="#"
                  onClick={reinstateImage.bind(null, images[i]._id)}
                >
                  <i
                    aria-hidden="true"
                    className="fas fa-undo"
                    title="Undo image deletion"
                  ></i>
                </button>
              </span>
              <img
                className="img-fluid mb-3 img-link mini-img mr-1"
                src={images[i].imageUrl}
                alt=""
                role="presentation"
              />
            </React.Fragment>
          )}
        </div>
      );
    }

    return <div>{items}</div>;
  }

  function renderTopImage(src) {
    setChange('topImage', src);
  }

  function deleteImage(id) {
    if (id && values.images) {
      let images = values.images.map(i => {
        if (i._id === id) {
          i.state = 'D';
        }
        return i;
      });
      setChange('images', images);
      setChange(
        'topImage',
        images && images.filter(i => i.state !== 'D').length > 0
          ? images.filter(i => i.state !== 'D')[0].imageUrl
          : '/images/default.png'
      );
    }
  }

  function reinstateImage(id) {
    if (id && values.images) {
      let images = values.images.map(i => {
        if (i._id === id) {
          i.state = 'N';
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
      setChange(
        'topImage',
        images && images.filter(i => i.state !== 'D').length > 0
          ? images.filter(i => i.state !== 'D')[0].imageUrl
          : '/images/default.png'
      );
    }
  }

  useEffect(() => {
    if (wanted) {
      wanted.topImage =
        wanted.images && wanted.images.filter(i => i.state !== 'D').length > 0
          ? wanted.images.filter(i => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
      setValues(wanted);
    }
  }, [wanted, setValues]);

  useEffect(() => {
    if (
      newImages &&
      newImages.length > 0 &&
      newImages.length === values.imagesToUpload
    ) {
      const imagesToAdd = [
        ...newImages.map(i => {
          let image = {};
          image._id = i._id;
          image.image = i.image;
          image.imageUrl = i.imageUrl;
          image.state = 'N';
          return image;
        })
      ];
      dispatch(clearNewImages());
      addArrayItem('images', imagesToAdd);
      setChange('imagesToUpload', 0);
    }
  }, [newImages, addArrayItem, setChange, values, dispatch]);

  function updateWanted() {
    const wanted = {
      ...values,
      activitys: getArray(values.activitys),
      security: getArray(values.security)
    };

    if (wanted._id) {
      dispatch(editKitbagWanted(wanted._id, wanted));
    } else {
      dispatch(createKitbagWanted(wanted));
    }
  }

  return (
    <div className="row">
      <div className="col-12 col-lg-6 order-1 order-lg-2" role="main">
        <div>
          <img
            id="preview"
            name="preview"
            className="img-fluid mb-3"
            src={values.topImage}
            alt=""
            role="presentation"
          />
        </div>
        <div>{renderSecondaryImages()}</div>
        <div className="form-group row">
          <label className="col-sm-3 col-form-label" htmlFor="photos">
            Images
          </label>
          <div className="col-sm-9">
            <div className="custom-file">
              <input
                type="file"
                multiple
                className="custom-file-input"
                id="photos"
                aria-describedby="photos"
                onChange={e => onFileChanged(e)}
              />
              <label className="custom-file-label" htmlFor="photos">
                Choose image(s)
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6 order-2 order-lg-1" role="main">
        <form className="mb-3" onSubmit={handleSubmit}>
          <TextForm
            colFormat="3-9"
            label="Title"
            value={values.title}
            field="title"
            handleChange={handleChange}
            error={errors.title}
          />
          <TextForm
            colFormat="3-9"
            label="Subtitle"
            value={values.subtitle}
            field="subtitle"
            handleChange={handleChange}
            error={errors.subtitle}
          />
          <TextAreaForm
            colFormat="3-9"
            label="Description"
            value={values.description}
            field="description"
            handleChange={handleChange}
            error={errors.description}
          />
          <TextForm
            colFormat="3-9"
            type="number"
            label="Offer Price"
            value={values.offerPrice}
            field="offerPrice"
            step=".01"
            min="0"
            max="99999.99"
            handleChange={handleChange}
            error={errors.offerPrice}
          />
          <TextForm
            colFormat="3-9"
            label="Location"
            value={values.location}
            field="location"
            handleChange={handleChange}
            error={errors.location}
          />
          <hr />
          <div>
            {values.offerDetails &&
              values.offerDetails.map((item, index) => (
                <div className="form-row" key={index}>
                  <DateForm
                    colFormat="a-4"
                    value={values.offerDetails[index].offeredOn}
                    label="Offered On"
                    field={`offerDetails[${index}].offeredOn`}
                    setChange={setChange}
                    index={index}
                  />
                  <TextForm
                    colFormat="a-2"
                    type="number"
                    value={values.offerDetails[index].askingPrice}
                    label="Asking Price"
                    field={`offerDetails[${index}].askingPrice`}
                    step=".01"
                    min="0.00"
                    max="99999.99"
                    handleChange={handleChange}
                    index={index}
                  />
                  <RemoveArrayButtonForm
                    colFormat="a-1"
                    title="Remove Offer"
                    onClick={() => removeArrayItem('offerDetails', index)}
                    index={index}
                  />
                </div>
              ))}
            <AddArrayButtonForm
              label="Add a new offer"
              onClick={() => addArrayItem('offerDetails', [initialOffer])}
            />
          </div>
          <hr />
          <TextForm
            colFormat="3-9"
            label="Activities"
            value={values.activitys}
            field="activitys"
            handleChange={handleChange}
            error={errors.activitys}
          />
          <CheckboxForm
            colFormat="3-1-8"
            label="Obtained"
            value={values.obtained}
            field="obtained"
            onChange={handleChange}
            error={errors.obtained}
            help="This item is automatically switched off when status is changed to Sold, Stolen, Recycled, Trashed or Donated, but can be changed so that it remains included in standard search."
          />
          <hr />
          <div>
            {values.images &&
              values.images.map((item, index) => (
                <div key={`${item._id}-${index}`}>
                  <input
                    name={`images[${index}]._id`}
                    type="hidden"
                    value={values.images[index]._id}
                  />
                  <input
                    name={`images[${index}].image`}
                    type="hidden"
                    value={values.images[index].image}
                  />
                  <input
                    name={`images[${index}].imageUrl`}
                    type="hidden"
                    value={values.images[index].imageUrl}
                  />
                  <input
                    name={`images[${index}].state`}
                    type="hidden"
                    value={values.images[index].state}
                  />
                  <input
                    name={`images[${index}].photoId`}
                    type="hidden"
                    value={values.images[index].photoId}
                  />
                </div>
              ))}
            {values.deletedImages &&
              values.deletedImages.map((item, index) => (
                <div key={`${item._id}-${index}`}>
                  <input
                    name={`deletedImages[${index}]._id`}
                    type="hidden"
                    value={values.deletedImages[index]._id}
                  />
                </div>
              ))}
          </div>
          <div>
            <button className="btn btn-primary" type="submit">
              Save
            </button>
            <Link className="btn btn-link" to="/kitbag/wanteds">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WantedForm;
