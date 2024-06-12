import "./Course.css";
import PropTypes from 'prop-types';

const Course = ({ className = "", course1Image, courseHeader, courseDescription }) => {
  return (
    <div className={`course-1 ${className}`}>
      <img
        className="course-1-image"
        loading="lazy"
        alt=""
        src={course1Image}
      />
      <div className="background-parent">
        <div className="background" />
        <h3 className="course-header">{courseHeader}</h3>
        <div className="lorem-ipsum-dolor-sit-amet-co-parent">
          <p className="lorem-ipsum-dolor3">
            {courseDescription}
          </p>
          {/* <div className="learn-more-parent3">
            <div className="learn-more6">Learn More</div>
            <div className="icon-wrapper1">
              <img className="icon3" alt="" src="/icon-3@2x.png" />
            </div>
            <div className="icon-wrapper4">
              <img className="icon6" loading="lazy" alt="" src="/icon1.svg" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

Course.propTypes = {
  className: PropTypes.string,
  course1Image: PropTypes.string,
  courseHeader: PropTypes.string,
};

export default Course;
