import "./FrameComponent.css";

const FrameComponent = () => {
  return (
    <section className="body-button-parent">
      <div className="body-button1">
        <button className="next-button">
          <div className="next">Next</div>
        </button>
      </div>
      <footer className="footer1">
        <div className="footer-bottom1">
          <div className="footer-bottom-background1" />
          <img
            className="shape-left-icon1"
            loading="lazy"
            alt=""
            src="/shape-left2.svg"
          />
          <div className="footer-bottom-inner">
            <div className="frame-parent">
              <div className="frame-group">
                <div className="logo-parent">
                  <img
                    className="logo-icon1"
                    loading="lazy"
                    alt=""
                    src="/logo1.svg"
                  />
                  <div className="newsletter-input1">
                    <h1 className="bespoke-software-solutions1">
                      Bespoke software solutions
                    </h1>
                    <div className="social-iconfacebook-group">
                      <img
                        className="social-iconfacebook1"
                        loading="lazy"
                        alt=""
                        src="/socialiconfacebook1.svg"
                      />
                      <img
                        className="social-iconyoutube1"
                        loading="lazy"
                        alt=""
                        src="/socialiconyoutube1@2x.png"
                      />
                      <img
                        className="social-iconinstagram1"
                        loading="lazy"
                        alt=""
                        src="/socialiconinstagram1.svg"
                      />
                      <img
                        className="social-icontwitter1"
                        loading="lazy"
                        alt=""
                        src="/socialicontwitter2.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className="all-rights-reserved1">
                  © All rights reserved – Finsweet
                </div>
              </div>
              <div className="website-link">
                <div className="company-parent">
                  <div className="company1">Company</div>
                  <div className="about-us-group">
                    <div className="about-us1">About Us</div>
                    <div className="careers1">Careers</div>
                    <div className="services1">Services</div>
                    <div className="blog1">Blog</div>
                  </div>
                </div>
                <div className="connect-parent">
                  <div className="connect1">Connect</div>
                  <div className="hifinsweetcom-group">
                    <div className="hifinsweetcom1">hi@finsweet.com</div>
                    <div className="website-list">+(123) 456-7890</div>
                  </div>
                </div>
              </div>
              <div className="frame-container">
                <div className="frame-wrapper">
                  <div className="join-newsletter-parent">
                    <div className="join-newsletter1">Join Newsletter</div>
                    <div className="input-parent">
                      <input
                        className="input1"
                        placeholder="Type email here"
                        type="text"
                      />
                      <button className="button4">
                        <div className="bg1" />
                        <div className="subscribe1">Subscribe</div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="privacy-policy-parent">
                  <div className="privacy-policy1">Privacy Policy</div>
                  <div className="terms-conditions1">{`Terms & Conditions`}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="shape-right-container">
            <div className="shape-right1" />
          </div>
        </div>
      </footer>
    </section>
  );
};

export default FrameComponent;
