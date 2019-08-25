import React from 'react';

import Title from './includes/Title';

class Purchase extends React.Component {

  onFormSubmit = () => {
//    //console.log('Buy package');
  }

  render() {
    return (
      <div>
        <Title title="Purchase" />
        <section id="main" className="container-fluid" aria-label="main body of content plus related links and features">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h4>Purchase { this.props.packageName } package</h4>
              </div>
            </div>

        <h3>Total Price: £{ Number(this.props.totalPrice).toFixed(2) }</h3>
        <hr />
        <div className="row pb-3">
            <div className="col-12 d-flex justify-content-end">
                <a href="/shop/" className="btn btn-secondary mr-3">Cancel and Return to Shop</a>
                <form onSubmit={this.onFormSubmit}>
                    <script
                        src="https://checkout.stripe.com/checkout.js" className="stripe-button"
                        data-key="pk_test_GrVrOqLyxwRIBFfaYw3oGQA4006DOxfIft"
                        data-amount={ this.props.totalPrice * 100 }
                        data-name="Moir Consultancy Limited"
                        data-description="Your package purchase from YouthKitbag"
                        data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
                        data-locale="auto"
                        data-currency="gbp">
                    </script>
                </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  }
}

export default Purchase;