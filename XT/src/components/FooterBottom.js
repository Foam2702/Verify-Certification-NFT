import "./FooterBottom.css";

const FooterBottom = () => {
  return (
    <footer className="footer-bottom">
      <div className="bg20" />
      <img
        className="shape-left-icon"
        loading="lazy"
        alt=""
        src="/shape-left.svg"
      />
      <div className="user-interface">
        <div className="data-visualization">
          <div className="data-analysis">
            <div className="pattern-recognition">
              <img
                className="logo-icon"
                loading="lazy"
                alt=""
                src="/logo.svg"
              />
              <div className="facial-recognition">
                <h1 className="bespoke-software-solutions">
                  Bespoke software solutions
                </h1>
                <div className="shape-stack">
                  <img
                    className="social-iconfacebook"
                    loading="lazy"
                    alt=""
                    src="/socialiconfacebook.svg"
                  />
                  <img
                    className="social-iconyoutube"
                    loading="lazy"
                    alt=""
                    src="/socialiconyoutube@2x.png"
                  />
                  <img
                    className="social-iconinstagram"
                    loading="lazy"
                    alt=""
                    src="/socialiconinstagram.svg"
                  />
                  <img
                    className="social-icontwitter"
                    loading="lazy"
                    alt=""
                    src="/socialicontwitter.svg"
                  />
                </div>
              </div>
            </div>
            <div className="all-rights-reserved">
              © All rights reserved – Finsweet
            </div>
          </div>
          <div className="frame-parent6">
            <div className="company-parent">
              <div className="company">Company</div>
              <div className="curve-collector">
                <div className="about-us">About Us</div>
                <div className="careers">Careers</div>
                <div className="services">Services</div>
                <div className="blog">Blog</div>
              </div>
            </div>
            <div className="connect-parent">
              <div className="connect">Connect</div>
              <div className="triangle-trio">
                <div className="hifinsweetcom">hi@finsweet.com</div>
                <div className="star-setter">+(123) 456-7890</div>
              </div>
            </div>
          </div>
          <div className="arcs-assembler">
            <div className="path-processor-wrapper">
              <div className="path-processor">
                <div className="join-newsletter">Join Newsletter</div>
                <div className="input-parent">
                  <input
                    className="input10"
                    placeholder="Type email here"
                    type="text"
                  />
                  <button className="button4">
                    <div className="bg21" />
                    <div className="subscribe">Subscribe</div>
                  </button>
                </div>
              </div>
            </div>
            <div className="symbol-sorter">
              <div className="privacy-policy">Privacy Policy</div>
              <div className="terms-conditions">{`Terms & Conditions`}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="layout-lab">
        <div className="shape-right" />
      </div>
    </footer>
  );
};

export default FooterBottom;
