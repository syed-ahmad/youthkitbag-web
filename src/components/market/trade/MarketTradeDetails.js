import React, { useEffect } from 'react';
import useForm from '../../hooks/useForm';
import { TextForm, TextAreaForm } from '../../includes/forms';

const MarketTradeDetails = ({ trade }) => {
  const { setChange, values, setValues } = useForm(trade);

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
    if (trade) {
      trade.topImage =
        trade.images && trade.images.filter(i => i.state !== 'D').length > 0
          ? trade.images.filter(i => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
      setValues(trade);
    }
  }, [trade, setValues]);

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
        <TextForm
          colFormat="3-9"
          label="Condition"
          value={values.condition}
          readOnly={true}
        />
        <TextForm
          colFormat="3-9"
          label="Asking Price"
          value={`£${values.askingPrice.toFixed(2)}`}
          readOnly={true}
        />
        <TextForm
          colFormat="3-9"
          label="Activities"
          value={values.activitys}
          readOnly={true}
        />
      </div>
    </div>
  );
};

export default MarketTradeDetails;
