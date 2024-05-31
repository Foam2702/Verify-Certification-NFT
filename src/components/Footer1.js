import "./Footer1.css";
import PropTypes from 'prop-types';

const Footer = ({ className = "" }) => {
  return (
    <footer className={`footer2 ${className}`}>
      <div className="footer-bottom2">
        <div className="footer-bottom-background2" />
        <img
          className="shape-left-icon2"
          loading="lazy"
          alt=""
          src="/shape-left1.svg"
        />
        <div className="footer-content1">
          <div className="footer-columns1">
            <div className="first-column">
              <div className="logo-column">
                <img
                  className="logo-icon2"
                  loading="lazy"
                  alt=""
                  src="/logo.svg"
                />
                <div className="bespoke-software-solutions-parent">
                  <h1 className="bespoke-software-solutions2">
                    Bespoke software solutions
                  </h1>
                  <div className="social">
                    <img
                      className="social-iconfacebook2"
                      loading="lazy"
                      alt=""
                      src="/socialiconfacebook.svg"
                    />
                    <img
                      className="social-iconyoutube2"
                      loading="lazy"
                      alt=""
                      src="/socialiconyoutube@2x.png"
                    />
                    <img
                      className="social-iconinstagram2"
                      loading="lazy"
                      alt=""
                      src="/socialiconinstagram.svg"
                    />
                    <img
                      className="social-icontwitter2"
                      loading="lazy"
                      alt=""
                      src="/socialicontwitter1.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="all-rights-reserved2">
                © All rights reserved – Finsweet
              </div>
            </div>
            <div className="second-column">
              <div className="company-info1">
                <b className="company2">Company</b>
                <div className="links">
                  <div className="about-us2">About Us</div>
                  <div className="careers2">Careers</div>
                  <div className="services2">Services</div>
                  <div className="blog2">Blog</div>
                </div>
              </div>
              <div className="newsletter-column">
                <b className="connect2">Connect</b>
                <div className="subscription">
                  <div className="hifinsweetcom2">hi@finsweet.com</div>
                  <div className="subscription-details">+(123) 456-7890</div>
                </div>
              </div>
            </div>
            <div className="third-column">
              <div className="legal1">
                <div className="legal-info">
                  <b className="join-newsletter2">Join Newsletter</b>
                  <div className="input-fields">
                    <input
                      className="input2"
                      placeholder="Type email here"
                      type="text"
                    />
                    <button className="button6">
                      <div className="bg2" />
                      <b className="subscribe2">Subscribe</b>
                    </button>
                  </div>
                </div>
              </div>
              <div className="policies">
                <div className="privacy-policy2">Privacy Policy</div>
                <div className="terms-conditions2">{`Terms & Conditions`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="shape-right-frame">
          <div className="shape-right2" />
        </div>
      </div>
    </footer>
  );
};


export default Footer;
