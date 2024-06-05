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
