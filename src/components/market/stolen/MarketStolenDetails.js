import React, { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import { TextForm, TextAreaForm, DateForm } from '../../includes/forms';

const MarketStolenDetails = ({ stolen }) => {
  const { setChange, values, setValues } = useForm(stolen);

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
    if (stolen) {
      stolen.topImage =
        stolen.images && stolen.images.filter(i => i.state !== 'D').length > 0
          ? stolen.images.filter(i => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
      setValues(stolen);
    }
  }, [stolen, setValues]);

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
      </div>
      <div className="col-12 col-lg-6 order-2 order-lg-1" role="main">
        <TextForm
          colFormat="3-9"
          label="Subtitle"
          value={values.subtitle}
          readOnly={true}
        />
        <TextAreaForm
          colFormat="3-9"
          label="Description"
          value={values.description}
          readOnly={true}
        />
        <DateForm
          colFormat="3-9"
          label="Date Stolen"
          value={values.stolenOn}
          readOnly={true}
        />
        <TextForm
          colFormat="3-9"
          label="Activities"
          value={values.activitys}
          readOnly={true}
        />
        <TextForm
          colFormat="3-9"
          label="Security"
          value={values.security}
          readOnly={true}
        />
      </div>
    </div>
  );
};

export default MarketStolenDetails;
