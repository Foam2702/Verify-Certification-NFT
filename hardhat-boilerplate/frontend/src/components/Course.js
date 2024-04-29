import { useMemo } from "react";
import "./Course.css";

const Course = ({
  course1Image,
  course1Header,
  courseDetail,
  propBackgroundColor,
  propTop,
  onSubjectLearnMoreFrameClick,
}) => {
  const course1BGStyle = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  const course1DetailStyle = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  return (
    <div className="course1">
      <img className="course1-image-icon" alt="" src={course1Image} />
      <div className="course1-bg" style={course1BGStyle} />
      <div className="course1-detail" style={course1DetailStyle}>
        <div className="course1-header">{course1Header}</div>
        <div className="course1-detail1">
         {courseDetail}
        </div>
        <button
          className="course1-learnmoreframe"
          onClick={onSubjectLearnMoreFrameClick}
        >
          <div className="learnmore">Learn More</div>
          <img
            className="course1-learnmoreicon"
            alt=""
            src="/course1-learnmoreicon.svg"
          />
        </button>
      </div>
    </div>
  );
};

export default Course;
