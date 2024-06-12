import "./FeauresSection.css";
import axios from "axios";
import { useEffect, useState } from 'react';
import Course from "./Course";

const FeauresSection = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/courses`);
        if (Array.isArray(result.data.courses)) {
          setCourses(result.data.courses);
          console.log(result.data.courses);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  // Duplicate courses to create an infinite loop effect
  const duplicatedCourses = [...courses, ...courses];

  return (
    <div className="feaures-section">
      <div className="body-header-2">
        {/* Add any header content here */}
      </div>
      <div className="list-courses">
        {duplicatedCourses.map((course, index) => (
          <div className="course" key={`${course.id}-${index}`}>
            <div className="course-background">
              <Course
                course1Image={course.image}
                courseHeader={course.name}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeauresSection;
