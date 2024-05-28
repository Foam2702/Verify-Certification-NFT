import "./FeauresSection.css";

const FeauresSection = ({ className = "" }) => {
  return (
    <div className={`feaures-section ${className}`}>
      <div className="body-header-2">
        <h1 className="body-header-3">
          Hơn 2000 chứng chỉ được xác thực tại ABC mỗi năm
        </h1>
      </div>
      <div className="list-courses">
        <div className="firstcourse">
          <div className="course-background" />
          <div className="course-types">
            <h3 className="ielts">IELTS</h3>
          </div>
          <div className="course-descriptions">
            <div className="lorem-ipsum-dolor">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
          </div>
          <div className="frame-div">
            <div className="learn-more3">Learn More</div>
            <div className="icon-wrapper1">
              <img className="icon3" alt="" src="/icon-3@2x.png" />
            </div>
          </div>
        </div>
        <div className="secondcourse">
          <div className="course-background1" />
          <h3 className="toeic">TOEIC</h3>
          <div className="lorem-ipsum-dolor1">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
          <div className="learn-more-parent1">
            <div className="learn-more4">Learn More</div>
            <div className="icon-wrapper2">
              <img className="icon4" alt="" src="/icon-1@2x.png" />
            </div>
          </div>
        </div>
        <div className="thirdcousr">
          <div className="course-background2" />
          <h3 className="mos">MOS</h3>
          <div className="lorem-ipsum-dolor2">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
          <div className="learn-more-parent2">
            <div className="learn-more5">Learn More</div>
            <div className="icon-wrapper3">
              <img className="icon5" alt="" src="/icon-3@2x.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FeauresSection.propTypes = {
  className: PropTypes.string,
};

export default FeauresSection;
