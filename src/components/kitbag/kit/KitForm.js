import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import { createKitbagKit, editKitbagKit } from '../../../actions/KitbagKitActions';
import { addImage, clearNewImages } from '../../../actions/ImageActions';
import validate from './KitFormValidationRules';
import { resize, dataURItoBlob } from '../../../helpers/imageResize';
import { DateForm, TextForm, TextAreaForm, SelectForm, AddArrayButtonForm, RemoveArrayButtonForm, CheckboxForm } from '../../includes/forms';

const KitForm = ({ kit }) => {

  const newErrors = useSelector(state => state.toast.currentMessage.errors);

  const initialPurchase = { from: '', quantity: 0, ondate: '', price: 0.00 };
  const initialInbag = { location: '', condition: 'used', quantity: 0 };

  const statusItems = ["Owned", "Trade", "Sold", "Stolen", "Wanted", "Recycled", "Trashed", "Given Away", "Donated", "Other"];
  const conditionItems = ["Used", "New", "Almost New", "Other"];

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
  } = useForm(kit, updateKit, validate);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  const dispatch = useDispatch();
  const newImages = useSelector(state => state.kitbag.kit.newImages);

  // ?? using hard coded constants for image sizes - should this be in image helper
  const MAXWIDTH = 720;
  const MAXHEIGHT = 720;

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

  // // ?? be more explicit in naming and push into utility
  // function getArray(field) {
  //   //if (Array.isArray(field)) {
  //     return field;
  //   //}
  //   //return field ? field.split(',') : []
  // }

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
    if (kit) {
      kit.topImage = kit.images && kit.images.filter(i => i.state !== 'D').length > 0 ? kit.images.filter(i => i.state !== 'D')[0].imageUrl : '/images/default.png';
      setValues(kit);
    }
  }, [kit, setValues]);

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

  function updateKit() {
    if (values._id) {
      dispatch(editKitbagKit(values._id, values));
    } else {
      dispatch(createKitbagKit(values));
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
            <TextForm colFormat="3-9" label="Title" value={values.title} field="title" handleChange={handleChange} error={errors.title} />
            <TextForm colFormat="3-9" label="Subtitle" value={values.subtitle} field="subtitle" handleChange={handleChange} error={errors.subtitle} />
            <TextAreaForm colFormat="3-9" label="Description" value={values.description} field="description" handleChange={handleChange} error={errors.description} />
            <SelectForm colFormat="3-9" label="Status" value={values.status} field="status" handleChange={handleChange} error={errors.status} items={statusItems} />
          <hr />
          <div>
            {values.purchases && values.purchases.map((item, index) => (
              <div className="form-row" key={index}>
                <TextForm colFormat="a-3" value={values.purchases[index].from} label="Purchased from" field={`purchases[${index}].from`} handleChange={handleChange} index={index} />
                <TextForm colFormat="a-2" type="number" value={values.purchases[index].quantity} label="Quantity" field={`purchases[${index}].quantity`} step="1" min="0" max="9999" handleChange={handleChange} index={index} />
                <DateForm colFormat="a-4" value={values.purchases[index].ondate} label="On" field={`purchases[${index}].ondate`} setChange={setChange} index={index} />
                <TextForm colFormat="a-2" type="number" value={values.purchases[index].price} label="Price" field={`purchases[${index}].price`} step=".01" min="0.00" max="99999.99"  handleChange={handleChange} index={index} />
                <RemoveArrayButtonForm colFormat="a-1" title="Remove Purchase" onClick={() => removeArrayItem('purchases', index)} index={index} />
              </div>
            ))}
            <AddArrayButtonForm label="Add a new purchase" onClick={() => addArrayItem('purchases', [initialPurchase])} />
          </div>
          <hr />
          <div>
            {values.inbag && values.inbag.map((item, index) => (
              <div className="form-row" key={index}>
                <TextForm colFormat="a-4" value={values.inbag[index].location} label="Storage location" field={`inbag[${index}].location`} handleChange={handleChange} index={index} />
                <SelectForm colFormat="a-4" label="Condition" value={values.inbag[index].condition} field={`inbag[${index}].condition`} handleChange={handleChange} items={conditionItems} index={index} />
                <TextForm colFormat="a-3" type="number" value={values.inbag[index].quantity} label="Quantity" field={`inbag[${index}].quantity`} step="1" min="0" max="9999" handleChange={handleChange} index={index} />
                <RemoveArrayButtonForm colFormat="a-1" title="Remove Inbag" onClick={() => removeArrayItem('inbag', index)} index={index} />
              </div>
            ))}
            <AddArrayButtonForm label="Add a new storage location" onClick={() => addArrayItem('inbag', [initialInbag])} />
          </div>
          <hr />
          <TextForm colFormat="3-9" type="number" value={values.warning} label="Warning Level" field="warning" step="1" min="0" max="9999" handleChange={handleChange} error={errors.warning} />
          <hr />
          <h3 className="h6">Categorise/Security (all optional)</h3>
          <small id="categoryhelp" className="form-text text-muted form-control-help mb-3">You can add activity names, personal tags and security numbers to your kit. Enter names separate by commas. (e.g. football, cycling)</small>
          <TextForm colFormat="3-9" label="Activities" value={values.activitys} field="activitys" handleChange={handleChange} error={errors.activitys} /> 
          <TextForm colFormat="3-9" label="Tags" value={values.tags} field="tags" handleChange={handleChange} error={errors.tags} /> 
          <TextForm colFormat="3-9" label="Security" value={values.security} field="security" handleChange={handleChange} error={errors.security} />
          <CheckboxForm colFormat="3-1-8" label="Active" value={values.active} field="active" onChange={handleChange} error={errors.active} 
              help="This item is automatically switched off when status is changed to Sold, Stolen, Recycled, Trashed or Donated, but can be changed so that it remains included in standard search." />
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
