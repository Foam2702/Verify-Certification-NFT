import "./HeaderContainer1.css";

const HeaderContainer = ({ className = "" }) => {
  return (
    <div className={`header-container4 ${className}`}>
      <div className="header-content4">
        <div className="titles4">
          <h1 className="title-14">Tên khóa học</h1>
          <p className="title-24">
            Đến với trang web của chúng tôi - nơi cung cấp dịch vụ xác thực
            chứng chỉ uy tín và đáng tin cậy nhất. Với công nghệ tiên tiến,
            chúng tôi cam kết đảm bảo tính bảo mật cao nhất cho mọi giao dịch
            của bạn. Hãy đến với chúng tôi để trải nghiệm sự an tâm và chuyên
            nghiệp ngay hôm nay!"
          </p>
        </div>
        <div className="approve-image2">
          <img
            className="image-icon1"
            loading="lazy"
            alt=""
            src="/image1@2x.png"
          />
        </div>
      </div>
    </div>
  );
};

HeaderContainer.propTypes = {
  className: PropTypes.string,
};

export default HeaderContainer;
