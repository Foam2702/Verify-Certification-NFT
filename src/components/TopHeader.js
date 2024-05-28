import "./TopHeader.css";

const TopHeader = ({ className = "" }) => {
  return (
    <header className={`top-header2 ${className}`}>
      <div className="top-container2">
        <div className="fickleflight-logo-frame">
          <div className="fickleflight-logo2">
            <h3 className="abc2">ABC</h3>
          </div>
        </div>
        <div className="navigation-right2">
          <nav className="navigation-menu2">
            <div className="explore2">Explore</div>
            <div className="search2">Search</div>
            <div className="hotels2">Hotels</div>
            <div className="offers2">Offers</div>
          </nav>
          <div className="account-section2">
            <img
              className="hamburger-menu-icon2"
              alt=""
              src="/hamburgermenu1@2x.png"
            />
            <img
              className="notification-bell-icon2"
              loading="lazy"
              alt=""
              src="/notification-bell1@2x.png"
            />
            <div className="button3">
              <div className="profile2">
                <img
                  className="profile-picture-icon2"
                  loading="lazy"
                  alt=""
                  src="/profile-picture1@2x.png"
                />
                <div className="profile-background2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

TopHeader.propTypes = {
  className: PropTypes.string,
};

export default TopHeader;
