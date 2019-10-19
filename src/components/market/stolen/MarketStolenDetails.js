import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import { reportMarketStolen } from '../../../actions/MarketStolenActions';
import { TextForm, TextAreaForm, DateForm } from '../../includes/forms';
import validate from './MarketStolenDetailsValidationRules';

const MarketStolenDetails = ({ stolen }) => {
  const dispatch = useDispatch();
  const newErrors = useSelector(state => state.toast.errors);

  const initialValues = { _id: '', reportedOn: '', details: '' };

  const {
    setChange,
    handleChange,
    handleSubmit,
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
    }
  }, [stolen]);

  function renderSecondaryImages() {
    if (!stolen || !stolen.images) {
      return null;
    }

    const { images } = stolen;
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
    if (stolen) {
      setValues({ _id: stolen._id, reportedOn: '', details: '' });
    }
  }, [stolen, setValues]);

  function updateStolen() {
    // if (values._id) {
    dispatch(reportMarketStolen(values._id, values));
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
            src={stolen.topImage}
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
          value={stolen.subtitle}
          readOnly={true}
        />
        <TextAreaForm
          colFormat="3-9"
          label="Description"
          value={stolen.description}
          readOnly={true}
        />
        <DateForm
          colFormat="3-9"
          label="Date Stolen"
          value={stolen.stolenOn}
          readOnly={true}
        />
        <TextForm
          colFormat="3-9"
          label="Activities"
          value={stolen.activitys}
          readOnly={true}
        />
        <TextForm
          colFormat="3-9"
          label="Security"
          value={stolen.security}
          readOnly={true}
        />
        {stolen.reportDetails && stolen.reportDetails.length === 0 && (
          <React.Fragment>
            <hr />
            <h3>Have you seen this?</h3>
            <p>
              If you have any information about the location, current ownership
              or theft of this piece of equipment, then please, please help by
              providing the details below. It may help lead to it&apos;s
              recovery.
            </p>
            <form className="mb-3" onSubmit={handleSubmit}>
              <div>
                <DateForm
                  colFormat="3-9"
                  label="Reported On"
                  value={values.reportedOn}
                  field="reportedOn"
                  setChange={setChange}
                  errors={errors.reportedOn}
                />
                <TextAreaForm
                  colFormat="3-9"
                  label="Details"
                  value={values.details}
                  field="details"
                  handleChange={handleChange}
                  errors={errors.reportedOn}
                />
              </div>
              <hr />
              <div>
                <button className="btn btn-primary" type="submit">
                  Report
                </button>
                <Link className="btn btn-link" to="/market/stolen">
                  Cancel
                </Link>
              </div>
            </form>
          </React.Fragment>
        )}
        {stolen.reportDetails && stolen.reportDetails.length > 0 && (
          <React.Fragment>
            <hr />
            <h3>Thank you! You supplied this information</h3>
            <form className="mb-3" onSubmit={handleSubmit}>
              <div>
                <DateForm
                  colFormat="3-9"
                  label="Reported On"
                  value={stolen.reportDetails[0].reportedOn}
                  readOnly={true}
                />
                <TextAreaForm
                  colFormat="3-9"
                  label="Details"
                  value={stolen.reportDetails[0].details}
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

export default MarketStolenDetails;
