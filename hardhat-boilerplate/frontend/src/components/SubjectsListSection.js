import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Course from "./Course";
import "./SubjectsListSection.css";

const SubjectsListSection = () => {
  const navigate = useNavigate();

  const onSubject1LearnMoreFrameClick = useCallback(() => {
    navigate("/coursespage");
  }, [navigate]);

  const onSubject2LearnMoreFrameClick = useCallback(() => {
    navigate("/coursespage");
  }, [navigate]);

  const onSubject3LearnMoreFrameClick = useCallback(() => {
    navigate("/coursespage");
  }, [navigate]);

  const onSubject4LearnMoreFrameClick = useCallback(() => {
    navigate("/coursespage");
  }, [navigate]);

  const onSubject5LearnMoreFrameClick = useCallback(() => {
    navigate("/coursespage");
  }, [navigate]);

  const onSubject6LearnMoreFrameClick = useCallback(() => {
    navigate("/coursespage");
  }, [navigate]);

  return (
    <div className="subjectslistsection">
      <b className="subjectslist">List of Subjects</b>
      <div className="subjectslistframe">
        <Course
          course1Image="/course1-image@2x.png"
          course1Header="Our internal process and longerm vision"
          propBackgroundColor="#dceaf5"
          propTop="246px"
          onSubject4LearnMoreFrameClick={onSubject1LearnMoreFrameClick}
        />
        <Course
          course1Image="/course2-image@2x.png"
          course1Header="Why you have to digitalize in 2021"
          propBackgroundColor="#dceaf5"
          propTop="246px"
          onSubject4LearnMoreFrameClick={onSubject2LearnMoreFrameClick}
        />
        <Course
          course1Image="/course3-image@2x.png"
          course1Header="Helping the next generation of leaders"
          propBackgroundColor="#dceaf5"
          propTop="251px"
          onSubject4LearnMoreFrameClick={onSubject3LearnMoreFrameClick}
        />
        <Course
          course1Image="/course1-image@2x.png"
          course1Header="Our internal process and longerm vision"
          propBackgroundColor="#dceaf5"
          propTop="246px"
          onSubject4LearnMoreFrameClick={onSubject4LearnMoreFrameClick}
        />
        <Course
          course1Image="/course2-image@2x.png"
          course1Header="Why you have to digitalize in 2021"
          propBackgroundColor="#dceaf5"
          propTop="246px"
          onSubject4LearnMoreFrameClick={onSubject5LearnMoreFrameClick}
        />
        <Course
          course1Image="/course3-image@2x.png"
          course1Header="Helping the next generation of leaders"
          propBackgroundColor="#dceaf5"
          propTop="251px"
          onSubject4LearnMoreFrameClick={onSubject6LearnMoreFrameClick}
        />
      </div>
    </div>
  );
};

export default SubjectsListSection;
