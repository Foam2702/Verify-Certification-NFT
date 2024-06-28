import "./FeauresSection.css";
import axios from "axios";
import { useEffect, useState } from 'react';
import Course from "./Course";
import { Link } from "@mui/material";
const FeauresSection = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/courses/top10`);
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
    //feaures-section
    <div className="feaures-section">
      <div className="body-header-2">
        <div>Most Popular Certificates</div>
        {/* <Link sx={{
          fontSize: "var(--font-size-10xl)",
          boxSizing: "border-box",
        }}>See all</Link> */}
      </div>
      <div className="list-courses">
        {duplicatedCourses.map((course, index) => (
          <div className="course" key={`${course.id}-${index}`}>
            <div className="course-background">
              <Course
                course1Image={course.image}
                courseHeader={course.name}
                courseOrg={course.licensing_authority}
                courseOrgImg={course.image_licensing_authority}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeauresSection;
