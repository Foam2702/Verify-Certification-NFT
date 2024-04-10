import { useMemo } from "react";
import "./FooterSection.css";

const FooterSection = ({
  propOverflow,
  propOverflow1,
  propOverflow2,
  propOverflow3,
}) => {
  const socialIconFacebookStyle = useMemo(() => {
    return {
      overflow: propOverflow,
    };
  }, [propOverflow]);

  const socialIconYoutubeStyle = useMemo(() => {
    return {
      overflow: propOverflow1,
    };
  }, [propOverflow1]);

  const socialIconInstagramStyle = useMemo(() => {
    return {
      overflow: propOverflow2,
    };
  }, [propOverflow2]);

  const socialIconTwitterStyle = useMemo(() => {
    return {
      overflow: propOverflow3,
    };
  }, [propOverflow3]);

  return (
    <div className="footersection">
      <div className="footertop">
        <div className="footertopleft">
          <div className="teamabc1">Team ABC</div>
          <div className="footertopleft-text">Bespoke software solutions</div>
          <div className="social">
            <button
              className="social-icon-facebook"
              style={socialIconFacebookStyle}
            >
              <img className="vector-icon" alt="" src="/vector.svg" />
            </button>
            <button
              className="social-icon-facebook"
              style={socialIconYoutubeStyle}
            >
              <img className="subtract-icon" alt="" src="/subtract.svg" />
            </button>
            <button
              className="social-icon-facebook"
              style={socialIconInstagramStyle}
            >
              <img className="vector-icon1" alt="" src="/vector1.svg" />
              <img className="vector-icon2" alt="" src="/vector2.svg" />
              <img className="vector-icon3" alt="" src="/vector3.svg" />
            </button>
            <button
              className="social-icon-facebook"
              style={socialIconTwitterStyle}
            >
              <img className="vector-icon4" alt="" src="/vector4.svg" />
            </button>
          </div>
        </div>
        <div className="company">
          <button className="company1">Company</button>
          <button className="about-us">About Us</button>
          <button className="about-us">Careers</button>
          <button className="about-us">Services</button>
          <button className="about-us">Blog</button>
        </div>
        <div className="connect">
          <b className="connect1">Connect</b>
          <div className="email">hi@finsweet.com</div>
          <div className="phonenumber">+(123) 456-7890</div>
        </div>
        <div className="subscribe">
          <b className="joinnewsletter">Join Newsletter</b>
          <input
            className="emailinput"
            placeholder="Type email here"
            type="text"
          />
          <button className="subbutton">
            <div className="subscribe1">Subscribe</div>
          </button>
        </div>
      </div>
      <div className="footerbottom">
        <div className="footerbottom-text">
          © All rights reserved – Finsweet
        </div>
        <div className="footerbottomlinks">
          <button className="privacypolicy">Privacy Policy</button>
          <button className="termsconditions">{`Terms & Conditions`}</button>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
