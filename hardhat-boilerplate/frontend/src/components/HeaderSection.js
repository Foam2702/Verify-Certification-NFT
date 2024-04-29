import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./HeaderSection.css";

function HeaderSection() {
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

  const Course = data.find(item => item.id === 18);
  const handleClick = () => {
    window.location.href = Course.link;
  };

  return (
    <div className="headersection">
    {Course && (
      <div className="headersection">
        <div className="headertext">
          <div className="courseheader">
            {Course.name}
          </div>
          <div className="coursedetail">
            {Course.description}
          </div>
          <button className="course-buybutton" onClick={handleClick}>
            <b className="buy">Buy</b>
          </button>
        </div>
        <img
          className="headerimageframe-icon"
          alt=""
          src={Course.image}
        />
      </div>
    )}
    </div>
  );
};

export default HeaderSection;
