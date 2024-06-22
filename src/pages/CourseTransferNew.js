// import HeaderSection from "../components/HeaderSection2";
import BodyCourses from "../components/BodyCourses";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import CourseSection from "../components/CourseSection"

import "./CourseTransferNew.css";

const CourseTransferNew = () => {
  return (
    <div className="coursetransfernew">
      <div className="header-section">
        <HeaderSection />
      </div>
      <CourseSection />

      <BodyCourses />
      <Footer
        shapeLeft="/shape-left@2x.png"
        socialIcontwitter="/socialicontwitter@2x.png"
      />    </div>
  );
};

export default CourseTransferNew;
