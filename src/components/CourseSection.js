import "./CourseSection.css";

const CourseSection = ({ className = "" }) => {
  return (
    <section className={`header-section4 ${className}`}>

      <div className="new-header-container">
        <div className="new-header-content">
          <div className="new-titles">
            <h1 className="new-title">Chứng chỉ nào đang hot</h1>
            <p className="title-23">
              Đến với trang web của chúng tôi - nơi cung cấp dịch vụ xác thực
              chứng chỉ uy tín và đáng tin cậy nhất. Với công nghệ tiên tiến,
              chúng tôi cam kết đảm bảo tính bảo mật cao nhất cho mọi giao dịch
              của bạn. Hãy đến với chúng tôi để trải nghiệm sự an tâm và chuyên
              nghiệp ngay hôm nay!"
            </p>
          </div>
          <div className="new-approve-image">
            <img
              className="new-approve-image-icon"
              loading="lazy"
              alt=""
              src="/Best-online-course-platforms.webp"
            />
          </div>
        </div>
      </div>
    </section>
  );
};


export default CourseSection;
