import "./FooterTop.css";

const FooterTop = () => {
  return (
    <div className="footer-top">
      <div className="connect">
        <div className="div">+(123) 456-7890</div>
        <div className="hifinsweetcom">hi@finsweet.com</div>
        <div className="connect1">Connect</div>
      </div>
      <div className="company">
        <div className="blog">Blog</div>
        <div className="services">Services</div>
        <div className="careers">Careers</div>
        <div className="about-us">About Us</div>
        <div className="company1">Company</div>
      </div>
      <div className="footer-left">
        <div className="social">
          <img
            className="social-icontwitter"
            alt=""
            src="/socialicontwitter@2x.png"
          />
          <img
            className="social-iconfacebook"
            alt=""
            src="/socialiconfacebook@2x.png"
          />
          <img
            className="social-iconinstagram"
            alt=""
            src="/socialiconinstagram@2x.png"
          />
          <img
            className="social-iconyoutube"
            alt=""
            src="/socialiconyoutube@2x.png"
          />
        </div>
        <h1 className="bespoke-software-solutions">
          Bespoke software solutions
        </h1>
        <img className="logo-icon" alt="" src="/logo.svg" />
      </div>
    </div>
  );
};

export default FooterTop;
