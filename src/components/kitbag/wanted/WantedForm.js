import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import {
  createKitbagWanted,
  editKitbagWanted
} from '../../../actions/KitbagWantedActions';
import validate from './WantedFormValidationRules';
import {
  DateForm,
  TextForm,
  TextAreaForm,
  AddArrayButtonForm,
  RemoveArrayButtonForm,
  CheckboxForm,
  ImagesForm
} from '../../includes/forms';

const WantedForm = ({ wanted }) => {
  const dispatch = useDispatch();
  const newErrors = useSelector(state => state.toast.errors);

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

  useEffect(() => {
    if (wanted) {
      wanted.topImage =
        wanted.images && wanted.images.filter(i => i.state !== 'D').length > 0
          ? wanted.images.filter(i => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
      setValues(wanted);
    }
  }, [wanted, setValues]);

  function updateWanted() {
    if (values._id) {
      dispatch(editKitbagWanted(values._id, values));
    } else {
      dispatch(createKitbagWanted(values));
    }
  }

  return (
    <div className="row">
      <ImagesForm
        values={values}
        setChange={setChange}
        addArrayItem={addArrayItem}
      />
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
            <Link className="btn btn-link" to="/kitbag/wanted">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WantedForm;
