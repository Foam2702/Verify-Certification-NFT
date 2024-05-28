import "./TopHeader1.css";

const TopHeader = ({ className = "" }) => {
  return (
    <header className={`top-header4 ${className}`}>
      <div className="top-container4">
        <div className="fickleflight-logo-wrapper2">
          <div className="fickleflight-logo4">
            <a className="abc4">ABC</a>
          </div>
        </div>
        <div className="navigation-right4">
          <nav className="navigation-menu4">
            <a className="explore4">Explore</a>
            <a className="search4">Search</a>
            <a className="hotels4">Hotels</a>
            <a className="offers4">Offers</a>
          </nav>
          <div className="account-section4">
            <img
              className="hamburger-menu-icon4"
              alt=""
              src="/hamburgermenu@2x.png"
            />
            <img
              className="notification-bell-icon4"
              loading="lazy"
              alt=""
              src="/notification-bell@2x.png"
            />
            <div className="button7">
              <div className="profile4">
                <img
                  className="profile-picture-icon4"
                  loading="lazy"
                  alt=""
                  src="/profile-picture@2x.png"
                />
                <div className="profile-background4" />
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
