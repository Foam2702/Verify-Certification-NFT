import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Course from "./Course";
import "./CoursesListSection.css";

function CoursesListSection() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://verify-certification-nft-production.up.railway.app/courses');
        setData(response.data.courses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const Course1 = data.find(item => item.id === 17);
  const handleClick1 = () => {
    window.location.href = Course1.link;
  };

  const Course2 = data.find(item => item.id === 19);
  const handleClick2 = () => {
    window.location.href = Course2.link;
  };

  const Course3 = data.find(item => item.id === 8);
  const handleClick3 = () => {
    window.location.href = Course3.link;
  };

  return (
    <div className="courseslistsection">
      <b className="coureslist">List of Courses</b>
      <div className="courseslistframe">
        {Course1 && (
        <Course
          course1Image={Course1.image}
          course1Header={Course1.name}
          courseDetail={Course1.description}
          onSubjectLearnMoreFrameClick={handleClick1}
        />
        )}
        {Course2 && (
        <Course
          course1Image={Course2.image}
          course1Header={Course2.name}
          courseDetail={Course2.description}
          onSubjectLearnMoreFrameClick={handleClick2}
        />
        )}
        {Course3 && (
        <Course
          course1Image={Course3.image}
          course1Header={Course3.name}
          courseDetail={Course3.description}
          onSubjectLearnMoreFrameClick={handleClick3}
        />
        )}
      </div>
    </div>
  );
};

export default CoursesListSection;
