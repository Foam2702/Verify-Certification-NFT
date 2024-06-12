import "./CourseSection.css";

const CourseSection = ({ className = "" }) => {
  return (
    <section className={`header-section4 ${className}`}>

      <div className="new-header-container">
        <div className="new-header-content">
          <div className="new-titles">
            <h1 className="new-title">Trending Certifications</h1>
            <p className="title-23">
              "We provide the in-demand certifications you seek.
              To affirm your abilities and open up new opportunities, possessing a reputable certificate is essential!"
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
