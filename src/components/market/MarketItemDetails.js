import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import { respondMarketItem } from '../../actions/MarketActions';
import { TextForm, TextAreaForm, DateForm } from '../includes/forms';
import validate from './MarketItemDetailsValidationRules';

const MarketItemDetails = ({ marketItem }) => {
  const dispatch = useDispatch();
  const newErrors = useSelector(state => state.toast.errors);

  const initialValues = { _id: '', offeredOn: '', details: '', offerPrice: 0 };

  const {
    setChange,
    handleChange,
    handleSubmit,
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
    if (marketItem) {
      marketItem.topImage =
        marketItem.images &&
        marketItem.images.filter(i => i.state !== 'D').length > 0
          ? marketItem.images.filter(i => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
    }
  }, [marketItem]);

  function renderSecondaryImages() {
    if (!marketItem || !marketItem.images) {
      return null;
    }

    const { images } = marketItem;
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
    if (marketItem) {
      setValues({
        _id: marketItem._id,
        offeredOn: '',
        details: '',
        offerPrice: 0
      });
    }
  }, [marketItem, setValues]);

  function updateTrade() {
    // if (values._id) {
    dispatch(respondMarketItem(values._id, values));
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
            src={marketItem.topImage}
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
          value={marketItem.subtitle}
          readOnly={true}
        />
        <TextAreaForm
          colFormat="3-9"
          label="Description"
          value={marketItem.description}
          readOnly={true}
        />
        <TextForm
          colFormat="3-9"
          label="Condition"
          value={marketItem.condition}
          readOnly={true}
        />
        <TextForm
          colFormat="3-9"
          label="Asking Price"
          value={`£${marketItem.askingPrice.toFixed(2)}`}
          readOnly={true}
        />
        <TextForm
          colFormat="3-9"
          label="Activities"
          value={marketItem.activitys}
          readOnly={true}
        />
        {marketItem.offerDetails && marketItem.offerDetails.length === 0 && (
          <React.Fragment>
            <hr />
            <h3>Are you interested in this item</h3>
            <p>
              If you are interested in aquiring this item, then make an offer
              and leave details below. The owner will get back to you as quickly
              as possible
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
                  label="Offer Price"
                  value={values.offerPrice}
                  field="offerPrice"
                  step=".01"
                  min="0"
                  max="99999.99"
                  handleChange={handleChange}
                  error={errors.offerPrice}
                />
              </div>
              <hr />
              <div>
                <button className="btn btn-primary" type="submit">
                  Offer
                </button>
                <Link className="btn btn-link" to="/market/marketItem">
                  Cancel
                </Link>
              </div>
            </form>
          </React.Fragment>
        )}
        {marketItem.offerDetails && marketItem.offerDetails.length > 0 && (
          <React.Fragment>
            <hr />
            <h3>Thank you! You made this offer</h3>
            <form className="mb-3" onSubmit={handleSubmit}>
              <div>
                <DateForm
                  colFormat="3-9"
                  label="Offered On"
                  value={marketItem.offerDetails[0].offeredOn}
                  readOnly={true}
                />
                <TextAreaForm
                  colFormat="3-9"
                  label="Details"
                  value={marketItem.offerDetails[0].details}
                  readOnly={true}
                />
                <TextForm
                  colFormat="3-9"
                  label="Offer"
                  value={`£${marketItem.offerDetails[0].offerPrice.toFixed(2)}`}
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

export default MarketItemDetails;
