import "./FooterBottom.css";

const FooterBottom = () => {
  return (
    <footer className="footer-bottom2">
      <div className="bg24" />
      <div className="footer-bottom3">
        <div className="footer-bottom-links1">
          <div className="privacy-policy1">Privacy Policy</div>
          <div className="terms-conditions1">{`Terms & Conditions`}</div>
        </div>
        <div className="all-rights-reserved1">
          © All rights reserved – Finsweet
        </div>
      </div>
      <div className="shape-right1" />
      <img className="shape-left-icon1" alt="" src="/shape-left@2x.png" />
    </footer>
  );
};

export default FooterBottom;
