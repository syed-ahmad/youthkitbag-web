import React, { useEffect } from 'react';
import useForm from '../../hooks/useForm';

const MarketTradeDetails = ({ trade }) => {

  const { setChange, values, setValues } = useForm(trade);

  function renderSecondaryImages() {
    if (!values || !values.images) {
      return null;
    }

    const { images } = values;
    const items = []
  
    for (let i = 0; i < images.length; i++) {
      items.push(
        <div key={`image${i}`} className="carousel-thumbnail d-inline-flex">
          <React.Fragment>
            <img className="img-fluid mb-3 img-link mini-img mr-1" src={images[i].imageUrl} alt="" role="presentation" onClick={renderTopImage.bind(null, images[i].imageUrl)} />
          </React.Fragment>
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

  useEffect(() => {
    if (trade) {
      trade.topImage = trade.images && trade.images.filter(i => i.state !== 'D').length > 0 ? trade.images.filter(i => i.state !== 'D')[0].imageUrl : '/images/default.png';
      setValues(trade);
    }
  }, [trade, setValues]);

  return (
      <div className="row">
        <div className="col-12 col-lg-6 order-1 order-lg-2" role="main">
          <div>
            <img id="preview" name="preview" className="img-fluid mb-3" src={values.topImage} alt="" role="presentation" />
          </div>
          <div>
            {renderSecondaryImages()}
          </div>
        </div>
        <div className="col-12 col-lg-6 order-2 order-lg-1" role="main">
          <div className="form-group row">
            <label htmlFor="subtitle" className="col-sm-3 col-form-label">Subtitle</label>
            <div className="col-sm-9">
              <input className="form-control" name="subtitle" type="text" disabled value={values.subtitle} aria-describedby="subtitle" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
            <div className="col-sm-9">
              <textarea className="form-control" name="description" rows="5" disabled value={values.description} aria-describedby="description"></textarea>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="condition" className="col-sm-3 col-form-label">Condition</label>
            <div className="col-sm-9">
              <input className="form-control" name="condition" type="text" disabled value={values.condition} aria-describedby="condition" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="askingPrice" className="col-sm-3 col-form-label">Asking Price</label>
            <div className="col-sm-9">
              <input className="form-control" name="askingPrice" type="text" disabled value={`£${values.askingPrice.toFixed(2)}`} aria-describedby="askingPrice" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="activitys" className="col-sm-3 col-form-label">Activities</label>
            <div className="col-sm-9">
              <input className="form-control" name="activitys" type="text" disabled value={values.activitys} aria-describedby="activitys" />
            </div>
          </div>
        </div>
      </div>
  );
}

export default MarketTradeDetails;