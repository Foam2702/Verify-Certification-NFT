import { FunctionComponent } from "react";
import "./FooterBottom.css";

const FooterBottom: FunctionComponent = () => {
  return (
    <footer className="footer-bottom">
      <div className="bg16" />
      <div className="footer-bottom1">
        <div className="footer-bottom-links">
          <div className="privacy-policy">Privacy Policy</div>
          <div className="terms-conditions">{`Terms & Conditions`}</div>
        </div>
        <div className="all-rights-reserved">
          © All rights reserved – Finsweet
        </div>
      </div>
      <div className="shape-right" />
      <img className="shape-left-icon" alt="" src="/shape-left@2x.png" />
    </footer>
  );
};

export default FooterBottom;
