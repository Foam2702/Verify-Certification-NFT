import "./HelpSection.css";

const HelpSection = () => {
  return (
    <div className="help-section">
      <div className="link-to-pages">
        <div className="link-to-vertification-page">
          <img
            className="vertification-image-icon"
            loading="lazy"
            alt=""
            src="/vertification-image@2x.png"
          />
          <h3 className="vertification-text">Xác thực chứng chỉ</h3>
          <div className="describe-text">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
          <div className="learn-more-parent">
            <div className="learn-more">Learn More</div>
            <div className="icon-wrapper">
              <img className="icon" loading="lazy" alt="" src="/icon@2x.png" />
            </div>
          </div>
        </div>
        <div className="link-to-upload-to-course">
          <img
            className="upload-to-upload-image"
            loading="lazy"
            alt=""
            src="/upload-to-upload-image@2x.png"
          />
          <h3 className="upload-to-course">Đăng khóa học</h3>
          <div className="describe-text1">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
          <div className="learn-more-group">
            <div className="learn-more1">Learn More</div>
            <div className="icon-container">
              <img className="icon1" alt="" src="/icon-1@2x.png" />
            </div>
          </div>
        </div>
        <div className="link-to-buy-course">
          <img
            className="buy-course-image"
            loading="lazy"
            alt=""
            src="/buy-course-image@2x.png"
          />
          <h3 className="buy-course">Mua khóa học</h3>
          <div className="describe-text2">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
          <div className="learn-more-container">
            <div className="learn-more2">Learn More</div>
            <div className="icon-frame">
              <img className="icon2" alt="" src="/icon@2x.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
