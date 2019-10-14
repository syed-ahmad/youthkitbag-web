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
  ImagesForm,
  CheckboxForm,
  SelectForm
} from '../../includes/forms';

const TradeForm = ({ trade }) => {
  const dispatch = useDispatch();
  const newErrors = useSelector(state => state.toast.errors);

  const initialValues = { ...trade };

  const conditionItems = ['Used', 'New', 'Almost New', 'Other'];

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
          <SelectForm
            colFormat="3-9"
            label="Condition"
            value={values.status}
            field="condition"
            handleChange={handleChange}
            error={errors.condition}
            items={conditionItems}
          />
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
          <TextForm
            colFormat="3-9"
            label="Activities"
            value={values.activitys}
            field="activitys"
            handleChange={handleChange}
            error={errors.activitys}
          />
          {values._id && (
            <CheckboxForm
              colFormat="3-1-8"
              label="Traded"
              value={values.traded}
              field="traded"
              onChange={handleChange}
              error={errors.traded}
              help="Have you managed to trade this item of kit? If yes, great! Check this box so that it won't be included on the trading market anymore."
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
