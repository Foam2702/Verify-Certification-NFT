import "./HeaderSection1.css";

const HeaderSection1 = ({ className = "" }) => {
  return (
    <section className={`header-section3 ${className}`}>
      <header className="top-header1">
        <div className="top-container1">
          <div className="fickleflight-logo-container">
            <div className="fickleflight-logo1">
              <h3 className="abc1">ABC</h3>
            </div>
          </div>
          <div className="navigation-right1">
            <nav className="navigation-menu1">
              <div className="explore1">Explore</div>
              <div className="search1">Search</div>
              <div className="hotels1">Hotels</div>
              <div className="offers1">Offers</div>
            </nav>
            <div className="account-section1">
              <img
                className="hamburger-menu-icon1"
                alt=""
                src="/hamburgermenu@2x.png"
              />
              <img
                className="notification-bell-icon1"
                loading="lazy"
                alt=""
                src="/notification-bell@2x.png"
              />
              <div className="button2">
                <div className="profile1">
                  <img
                    className="profile-picture-icon1"
                    loading="lazy"
                    alt=""
                    src="/profile-picture@2x.png"
                  />
                  <div className="profile-background1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="header-container1">
        <div className="header-content1">
          <div className="titles1">
            <h1 className="title-11">
              Xác thực nhanh chóng, tin cậy, với đội ngũ chuyên gia đến từ các
              cơ quan phát hành uy tín.
            </h1>
            <div className="title-21">
              Đến với trang web của chúng tôi - nơi cung cấp dịch vụ xác thực
              chứng chỉ uy tín và đáng tin cậy nhất. Với công nghệ tiên tiến,
              chúng tôi cam kết đảm bảo tính bảo mật cao nhất cho mọi giao dịch
              của bạn. Hãy đến với chúng tôi để trải nghiệm sự an tâm và chuyên
              nghiệp ngay hôm nay!"
            </div>
          </div>
          <div className="approve-image">
            <img
              className="approve-image-icon"
              loading="lazy"
              alt=""
              src="/approve-image@2x.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

HeaderSection1.propTypes = {
  className: PropTypes.string,
};

export default HeaderSection1;
