import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <a id="footer-acc-jump" className="sr-only sr-only-focusable" href="#header-acc-jump">
          <div className="container">
            <span className="skiplink-text">Skip to header</span>
          </div>
        </a>
        <section className="footer" aria-label="secondary navigation">
          <div className="container-fluid text-center text-md-left p-4">
            <h2 className="sr-only">Supplementary navigation to key corporate and informational sections of the website, including contact details</h2>
            <div className="row text-center text-md-left">
              <div className="col-md-4 mx-auto">
                <h3 className="text-uppercase mb-4 font-weight-bold h6">About YouthKitbag</h3>
                <ul className="links">
                  <li><a href="/help-and-contact/index">Help &amp; contacts</a></li>
                </ul>
              </div>
              <hr className="w-100 clearfix d-md-none mx-3" />
              <div className="col-md-4 mx-auto">
                <h3 className="text-uppercase mb-4 font-weight-bold h6">Information for</h3>
                <ul className="links">
                  <li><a href="/info-for/media/index">Media</a></li>
                </ul>
              </div>
              <hr className="w-100 clearfix d-md-none mx-3" />
              <div className="col-md-4 mx-auto">
                <h3 className="sr-only">Contact details</h3>
                <p><span aria-hidden="true" className="fas fa-home mr-3" title="Contact address"></span><span className="sr-only">Our contact address is:</span>YouthKitbag c/o Moir Consultancy Ltd</p>
                <p><span aria-hidden="true" className="fas fa-envelope mr-3" title="Contact email"></span><span className="sr-only">Our contact email address is:</span>admin@youthkitbag.com</p>
                <p><span aria-hidden="true" className="fas fa-phone mr-3" title="Contact phone"></span><span className="sr-only">Our contact phone number is:</span>+ 44 7949-420404</p>
              </div>
            </div>
          </div>
        </section>
      
        <section className="footer footer-copyright" aria-label="links to terms and conditions, privacy and cookies statements and accessibility standards for this website">
          <div className="container-fluid text-center py-2">
            <h2 className="sr-only">Navigation to legal and accessibility content</h2>
            <div className="row d-flex align-items-center">
              <div className="col-md-8">
                <div className="d-flex flex-column flex-md-row">
                  <div className="p-2"><a href="/corporate/terms-and-conditions/index">Terms &amp; conditions </a></div>
                  <div className="p-2"><a href="/corporate/privacy-and-cookies/index">Privacy &amp; cookies</a></div>
                  <div className="p-2"><a href="/corporate/website-accessibility/index">Website accessibility</a></div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex flex-column flex-md-row-reverse">
                  <div className="p-2">© Copyright Moir Consultancy Limited</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>    
    );
  }
}

export default Footer;