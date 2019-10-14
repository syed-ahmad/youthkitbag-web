import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import { offerMarketWanted } from '../../../actions/MarketWantedActions';
import { TextForm, TextAreaForm, DateForm } from '../../includes/forms';
import validate from './MarketWantedDetailsValidationRules';

const MarketWantedDetails = ({ wanted }) => {
  const dispatch = useDispatch();
  const newErrors = useSelector(state => state.toast.errors);

  const initialValues = { _id: '', offeredOn: '', details: '', askingPrice: 0 };

  const {
    setChange,
    handleChange,
    handleSubmit,
    values,
    setValues,
    errors,
    setErrors
  } = useForm(initialValues, updateWanted, validate);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  function renderSecondaryImages() {
    if (!values || !values.images) {
      return null;
    }

    const { images } = values;
    const items = [];

    for (let i = 0; i < images.length; i++) {
      items.push(
        <div key={`image${i}`} className="carousel-thumbnail d-inline-flex">
          <React.Fragment>
            <img
              className="img-fluid mb-3 img-link mini-img mr-1"
              src={images[i].imageUrl}
              alt=""
              role="presentation"
              onClick={renderTopImage.bind(null, images[i].imageUrl)}
            />
          </React.Fragment>
        </div>
      );
    }

    return <div>{items}</div>;
  }

  function renderTopImage(src) {
    setChange('topImage', src);
  }

  useEffect(() => {
    if (wanted) {
      setValues({
        _id: wanted._id,
        offeredOn: '',
        details: '',
        askingPrice: 0
      });
    }
  }, [wanted, setValues]);

  function updateWanted() {
    // if (values._id) {
    dispatch(offerMarketWanted(values._id, values));
    // } else {
    //   dispatch(createKitbagStolen(values));
    // }
  }

  return (
    <div className="row">
      <div className="col-12 col-lg-6 order-1 order-lg-2" role="main">
        <div>
          <img
            id="preview"
            name="preview"
            className="img-fluid mb-3"
            src={wanted.topImage}
            alt=""
            role="presentation"
          />
        </div>
        <div>{renderSecondaryImages()}</div>
      </div>
      <div className="col-12 col-lg-6 order-2 order-lg-1" role="main">
        <TextForm
          colFormat="3-9"
          label="Subtitle"
          value={wanted.subtitle}
          readOnly={true}
        />
        <TextAreaForm
          colFormat="3-9"
          label="Description"
          value={wanted.description}
          readOnly={true}
        />
        <TextForm
          colFormat="3-9"
          label="Offer Price"
          value={`£${wanted.offerPrice.toFixed(2)}`}
          readOnly={true}
        />
        <TextForm
          colFormat="3-9"
          label="Activities"
          value={wanted.activitys}
          readOnly={true}
        />
        {wanted.offerDetails && wanted.offerDetails.length === 0 && (
          <React.Fragment>
            <hr />
            <h3>Can you provide this item</h3>
            <p>
              If you have one of these items, and would be willing to trade to
              this person, then please fill in your details below and a
              reasonable asking price or just recycle your unwanted gear and
              offer it for free.
            </p>
            <form className="mb-3" onSubmit={handleSubmit}>
              <div>
                <DateForm
                  colFormat="3-9"
                  label="Offered On"
                  value={values.offeredOn}
                  field="reportedOn"
                  setChange={setChange}
                  errors={errors.offeredOn}
                />
                <TextAreaForm
                  colFormat="3-9"
                  label="Details"
                  value={values.details}
                  field="details"
                  handleChange={handleChange}
                  errors={errors.reportedOn}
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
              </div>
              <hr />
              <div>
                <button className="btn btn-primary" type="submit">
                  Offer
                </button>
                <Link className="btn btn-link" to="/market/wanted">
                  Cancel
                </Link>
              </div>
            </form>
          </React.Fragment>
        )}
        {wanted.offerDetails && wanted.offerDetails.length > 0 && (
          <React.Fragment>
            <hr />
            <h3>Thank you! You made this offer</h3>
            <form className="mb-3" onSubmit={handleSubmit}>
              <div>
                <DateForm
                  colFormat="3-9"
                  label="Offered On"
                  value={wanted.offerDetails[0].offeredOn}
                  readOnly={true}
                />
                <TextAreaForm
                  colFormat="3-9"
                  label="Details"
                  value={wanted.offerDetails[0].details}
                  readOnly={true}
                />
                <TextForm
                  colFormat="3-9"
                  label="Asking Price"
                  value={`£${wanted.offerDetails[0].askingPrice.toFixed(2)}`}
                  readOnly={true}
                />
              </div>
            </form>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default MarketWantedDetails;
