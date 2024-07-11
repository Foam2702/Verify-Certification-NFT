import "./FeauresSection.css";
import axios from "axios";
import { useEffect, useState } from 'react';
import Course from "./Course";
import { Link } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import useSigner from "../state/signer";

const FeauresSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false)
  const { signer, address, connectWallet } = useSigner()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await axios.get(`https://verify-certification-nft-production.up.railway.app/courses/top10`);
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
  const handleCourseClick = () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      if (!address) {
        navigate("/");
      } else {
        navigate("/coursetransfernew");
      }
      setLoading(false);
    }, 1000);
  }

  // Duplicate courses to create an infinite loop effect
  const duplicatedCourses = [...courses, ...courses];

  return (
    //feaures-section
    <div className="feaures-section">
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
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
            <button className="course-background" onClick={handleCourseClick}>

              <Course
                course1Image={course.image}
                courseHeader={course.name}
                courseOrg={course.licensing_authority}
                courseOrgImg={course.image_licensing_authority}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeauresSection;
