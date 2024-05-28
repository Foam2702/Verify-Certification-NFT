import Course from "./Course";
import PropTypes from "prop-types";
import "./BodySection.css";

const BodySection = ({ className = "" }) => {
  return (
    <section className={`body-section2 ${className}`}>
      <div className="body-header3">
        <h1 className="body-header-text5">Danh mục khóa học</h1>
      </div>
      <div className="careers-section1">
        <Course course1Image="/course-1-image@2x.png" courseHeader="Ngôn ngữ" />
        <Course
          course1Image="/course-2-image@2x.png"
          courseHeader="Lập trình"
        />
        <Course
          course1Image="/course-3-image@2x.png"
          courseHeader="Tin học văn phòng"
        />
        <Course
          course1Image="/course-1-image@2x.png"
          courseHeader="Marketing"
        />
        <Course course1Image="/course-3-image@2x.png" courseHeader="Art" />
        <Course course1Image="/course-2-image@2x.png" courseHeader="Luật" />
      </div>
    </section>
  );
};

BodySection.propTypes = {
  className: PropTypes.string,
};

export default BodySection;
