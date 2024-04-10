import Course from "./Course";
import "./CoursesListSection.css";

const CoursesListSection = () => {
  return (
    <div className="courseslistsection">
      <b className="coureslist">List of Courses</b>
      <div className="courseslistframe">
        <Course
          course1Image="/course1-image@2x.png"
          course1Header="Our internal process and longerm vision"
        />
        <Course
          course1Image="/course2-image@2x.png"
          course1Header="Why you have to digitalize in 2021"
          propBackgroundColor="#fff"
          propTop="246px"
        />
        <Course
          course1Image="/course3-image@2x.png"
          course1Header="Helping the next generation of leaders"
          propBackgroundColor="#fff"
          propTop="251px"
        />
      </div>
    </div>
  );
};

export default CoursesListSection;
