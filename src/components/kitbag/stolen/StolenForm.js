import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import {
  createKitbagStolen,
  editKitbagStolen
} from '../../../actions/KitbagStolenActions';
import validate from './StolenFormValidationRules';
import {
  DateForm,
  TextForm,
  TextAreaForm,
  RemoveArrayButtonForm,
  CheckboxForm,
  ImagesForm
} from '../../includes/forms';

const StolenForm = ({ stolen }) => {
  const dispatch = useDispatch();
  const newErrors = useSelector(state => state.toast.errors);

  const initialValues = { ...stolen };

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
  } = useForm(initialValues, updateStolen, validate);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  useEffect(() => {
    if (stolen) {
      stolen.topImage =
        stolen.images && stolen.images.filter(i => i.state !== 'D').length > 0
          ? stolen.images.filter(i => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
      setValues(stolen);
    }
  }, [stolen, setValues]);

  function updateStolen() {
    if (values._id) {
      dispatch(editKitbagStolen(values._id, values));
    } else {
      dispatch(createKitbagStolen(values));
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
          <DateForm
            colFormat="3-9"
            label="Date Stolen"
            value={values.stolenOn}
            field="stolenOn"
            setChange={setChange}
            errors={errors}
          />
          <TextForm
            colFormat="3-9"
            label="Location"
            value={values.location}
            field="location"
            handleChange={handleChange}
            error={errors.location}
          />
          <TextForm
            colFormat="3-9"
            label="Tracking"
            value={values.tracking}
            field="tracking"
            handleChange={handleChange}
            error={errors.tracking}
          />
          <hr />
          <TextForm
            colFormat="3-9"
            label="Activities"
            value={values.activitys}
            field="activitys"
            handleChange={handleChange}
            error={errors.activitys}
          />
          <TextForm
            colFormat="3-9"
            label="Security"
            value={values.security}
            field="security"
            handleChange={handleChange}
            error={errors.security}
          />
          {values._id && (
            <CheckboxForm
              colFormat="3-1-8"
              label="Recovered"
              value={values.recovered}
              field="recovered"
              onChange={handleChange}
              error={errors.recovered}
              help="If you're fortunate enough to have this item recovered, that is fantastic news. Check this box so that it won't be included on the stolen report anymore."
            />
          )}
          <hr />
          <div>
            {values.groups &&
              values.groups.map((item, index) => (
                <div className="form-row" key={index}>
                  <TextForm
                    colFormat="a-6"
                    value={values.groups[index].name}
                    label="Name"
                    field={`groups[${index}].name`}
                    readOnly={true}
                    index={index}
                  />
                  <DateForm
                    colFormat="a-4"
                    value={values.groups[index].available}
                    label="Available"
                    field={`groups[${index}].available`}
                    setChange={setChange}
                    index={index}
                  />
                  <input
                    name={`groups[${index}].include`}
                    type="hidden"
                    value={values.groups[index].include}
                  />
                  <RemoveArrayButtonForm
                    colFormat="a-2"
                    title="Remove Purchase"
                    onClick={() => removeArrayItem('groups', index)}
                    index={index}
                  />
                </div>
              ))}
          </div>
          <hr />
          {/* <div>
            {values.reportDetails &&
              values.reportDetails.map((item, index) => (
                <div className="form-row" key={index}>
                  <DateForm
                    colFormat="a-4"
                    value={values.reportDetails[index].reportedOn}
                    label="Reported On"
                    field={`reportDetails[${index}].reportedOn`}
                    setChange={setChange}
                    index={index}
                  />
                  <TextForm
                    colFormat="a-6"
                    value={values.reportDetails[index].details}
                    label="Details"
                    field={`reportDetails[${index}].details`}
                    handleChange={handleChange}
                    index={index}
                  />
                  <RemoveArrayButtonForm
                    colFormat="a-1"
                    title="Remove Report"
                    onClick={() => removeArrayItem('reportDetails', index)}
                    index={index}
                  />
                </div>
              ))}
            <AddArrayButtonForm
              label="Add a new report"
              onClick={() => addArrayItem('reportDetails', [initialReport])}
            />
          </div>
          <hr /> */}
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
            <Link className="btn btn-link" to="/kitbag/stolen">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StolenForm;
