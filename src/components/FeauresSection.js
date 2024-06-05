import "./FeauresSection.css";
import axios from "axios";
import { useEffect, useState } from 'react'
import Course from "./Course";

const FeauresSection = () => {
  const [courses, setCourses] = useState([])
  useEffect(() => {
    const fetchCourses = async () => {
      const result = await axios.get(`http://localhost:8080`)
      if (Array.isArray(result.data.courses)) {
        setCourses(result.data.courses)
        console.log(result.data.courses)
      }
    }
    fetchCourses().catch(error => console.error(error));
  }, [])
  return (
    <div className="feaures-section">
      <div className="body-header-2">
      </div>
      <div className="list-courses">
        {courses.map((course, index) => (
          <div className={`course${index + 1}`} key={course.id}>
            <div className="course-background" />
            {/* <MultiActionAreaCard image={course.image} />            <div className="course-types">
              <h3 className={course.name}>{course.name}</h3>
            </div>
            <div className="course-descriptions">
              <div className="lorem-ipsum-dolor">{course.description}</div>
            </div>
            <div className="frame-div">
              <div className="learn-more3">Learn More</div>
              <div className="icon-wrapper1">
                <img className="icon3" alt="" src="/icon-3@2x.png" />
              </div>
            </div> */}
            <Course
              course1Image={course.image}
              courseHeader={course.name}
              courseDescription={course.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeauresSection;
