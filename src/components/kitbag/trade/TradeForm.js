import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import {
  createKitbagTrade,
  editKitbagTrade
} from '../../../actions/KitbagTradeActions';
import validate from './TradeFormValidationRules';
import {
  DateForm,
  TextForm,
  TextAreaForm,
  RemoveArrayButtonForm,
  ImagesForm
} from '../../includes/forms';

const TradeForm = ({ trade }) => {
  const dispatch = useDispatch();
  const newErrors = useSelector(state => state.toast.errors);

  const initialGroup = { name: '', available: '2019-01-01' };
  const initialValues = { ...trade };

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
  } = useForm(initialValues, updateTrade, validate);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  useEffect(() => {
    if (trade) {
      trade.topImage =
        trade.images && trade.images.filter(i => i.state !== 'D').length > 0
          ? trade.images.filter(i => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
      setValues(trade);
    }
  }, [trade, setValues]);

  function updateTrade() {
    if (values._id) {
      dispatch(editKitbagTrade(values._id, values));
    } else {
      dispatch(createKitbagTrade(values));
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
          <div className="form-group row">
            <label htmlFor="condition" className="col-sm-3 col-form-label">
              Condition
            </label>
            <div className="col-sm-9">
              <select
                className="custom-select"
                name="condition"
                onChange={handleChange}
                onBlur={handleChange}
                value={values.condition}
                aria-describedby="condition"
              >
                <option value="used">Used</option>
                <option value="new">New</option>
              </select>
            </div>
          </div>
          <TextForm
            colFormat="3-9"
            type="number"
            label="Asking Price"
            value={values.askingPrice}
            field="askingPrice"
            step=".01"
            min="0"
            max="99999.99"
            handleChange={handleChange}
            error={errors.askingPrice}
          />
          <hr />
          <div>
            {values.groups &&
              values.groups.map((item, index) => (
                <div className="form-row" key={index}>
                  <TextForm
                    colFormat="a-6"
                    value={values.groups[index].title}
                    label="Name"
                    field={`groups[${index}].title`}
                    handleChange={handleChange}
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
                  <RemoveArrayButtonForm
                    colFormat="a-1"
                    title="Remove Purchase"
                    onClick={() => removeArrayItem('groups', index)}
                    index={index}
                  />
                </div>
              ))}
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => addArrayItem('groups', [initialGroup])}
            >
              Add a new group
            </button>
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
            <Link className="btn btn-link" to="/kitbag/trade">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TradeForm;
