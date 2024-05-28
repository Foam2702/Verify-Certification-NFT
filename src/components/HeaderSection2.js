import "./HeaderSection2.css";

const HeaderSection = ({ className = "" }) => {
  return (
    <section className={`header-section4 ${className}`}>
      <header className="top-header3">
        <div className="top-container3">
          <div className="fickleflight-logo-wrapper1">
            <div className="fickleflight-logo3">
              <a className="abc3">ABC</a>
            </div>
          </div>
          <div className="navigation-right3">
            <nav className="navigation-menu3">
              <a className="explore3">Explore</a>
              <a className="search3">Search</a>
              <a className="hotels3">Hotels</a>
              <a className="offers3">Offers</a>
            </nav>
            <div className="account-section3">
              <img
                className="hamburger-menu-icon3"
                alt=""
                src="/hamburgermenu@2x.png"
              />
              <img
                className="notification-bell-icon3"
                loading="lazy"
                alt=""
                src="/notification-bell@2x.png"
              />
              <div className="button5">
                <div className="profile3">
                  <img
                    className="profile-picture-icon3"
                    loading="lazy"
                    alt=""
                    src="/profile-picture@2x.png"
                  />
                  <div className="profile-background3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="header-container3">
        <div className="header-content3">
          <div className="titles3">
            <h1 className="title-13">Khóa học nào đang hot</h1>
            <p className="title-23">
              Đến với trang web của chúng tôi - nơi cung cấp dịch vụ xác thực
              chứng chỉ uy tín và đáng tin cậy nhất. Với công nghệ tiên tiến,
              chúng tôi cam kết đảm bảo tính bảo mật cao nhất cho mọi giao dịch
              của bạn. Hãy đến với chúng tôi để trải nghiệm sự an tâm và chuyên
              nghiệp ngay hôm nay!"
            </p>
          </div>
          <div className="course-transfer-image">
            <img
              className="image-icon"
              loading="lazy"
              alt=""
              src="/image@2x.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

HeaderSection.propTypes = {
  className: PropTypes.string,
};

export default HeaderSection;
