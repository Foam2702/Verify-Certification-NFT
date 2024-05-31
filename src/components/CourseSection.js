import "./CourseSection.css";
import PropTypes from 'prop-types';

const CourseSection = ({ className = "" }) => {
  return (
    <section className={`header-section4 ${className}`}>

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


export default CourseSection;
