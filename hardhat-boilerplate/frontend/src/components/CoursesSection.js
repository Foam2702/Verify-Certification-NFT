import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./CoursesSection.css";

function CoursesSection() {
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

  const Course1 = data.find(item => item.id === 1);
  const handleClick1 = () => {
    window.location.href = Course1.link;
  };

  const Course2 = data.find(item => item.id === 10);
  const handleClick2 = () => {
    window.location.href = Course2.link;
  };

  const Course3 = data.find(item => item.id === 8);
  const handleClick3 = () => {
    window.location.href = Course3.link;
  };

  const Course4 = data.find(item => item.id === 16);
  const handleClick4 = () => {
    window.location.href = Course4.link;
  };

  const Course5 = data.find(item => item.id === 5);
  const handleClick5 = () => {
    window.location.href = Course5.link;
  };

  const Course6 = data.find(item => item.id === 12);
  const handleClick6 = () => {
    window.location.href = Course6.link;
  };



  return (
    <div className="coursessection">
      {Course1 && (
        <div className="courseframe1">
          <div className="courseframe1-text" >
            <div className="courseframe1-header">
              {Course1.name}
            </div>
            <div className="courseframe1-detail">
              {Course1.description}
            </div>
            <button className="courseframe1-buybutton" onClick={handleClick1}>
              <b className="buy1">Buy</b>
            </button>
          </div>
          <div className="courseframe3-imageframe">
            <img
              className="courseframe1-imageframe-icon"
              alt=""
              src={Course1.image}
            />
          </div>
        </div>
      )}
      {Course2 && (
      <div className="courseframe1">
        <div className="courseframe2-imageframe">
          <img
            className="courseframe2-image-icon"
            alt=""
            src={Course2.image}
          />
        </div>
        <div className="courseframe1-text">
          <div className="courseframe2-header">{Course2.name}</div>
          <div className="courseframe1-detail">
            {Course2.description}
          </div>
          <button className="courseframe1-buybutton" onClick={handleClick2}>
            <b className="buy2">Buy</b>
          </button>
        </div>
      </div>
      )}
      {Course3 && (
      <div className="courseframe1">
        <div className="courseframe1-text">
          <div className="courseframe2-header">
            <span className="digitalizatio">
              {Course3.name}
            </span>n
          </div>
          <div className="courseframe1-detail">
            {Course3.description}
          </div>
          <button className="courseframe1-buybutton" onClick={handleClick3}>
            <b className="buy3">Buy</b>
          </button>
        </div>
        <div className="courseframe3-imageframe">
          <img
            className="courseframe3-image-icon"
            alt=""
            src={Course3.image}
          />
        </div>
      </div>
      )}
      {Course4 && (
      <div className="courseframe1">
        <div className="courseframe4-imageframe">
          <img
            className="courseframe4-image-icon"
            alt=""
            src={Course4.image}
          />
        </div>
        <div className="courseframe4-text">
          <div className="courseframe2-header">{Course4.name}</div>
          <div className="courseframe1-detail">
            {Course4.description}
          </div>
          <button className="courseframe1-buybutton" onClick={handleClick4}>
            <b className="buy3">Buy</b>
          </button>
        </div>
      </div>
      )}
      {Course5 && (
      <div className="courseframe1">
        <div className="courseframe4-text">
          <div className="courseframe2-header">{Course5.name}</div>
          <div className="courseframe1-detail">
            {Course5.description}
          </div>
          <button className="courseframe1-buybutton" onClick={handleClick5}>
            <b className="buy5">Buy</b>
          </button>
        </div>
        <div className="courseframe5-imageframe">
          <img
            className="courseframe5-image-icon"
            alt=""
            src={Course5.image}
          />
        </div>
      </div>
      )}
      {Course6 && (
      <div className="courseframe1">
        <div className="courseframe6-imageframe">
          <img
            className="courseframe6-image-icon"
            alt=""
            src={Course6.image}
          />
        </div>
        <div className="courseframe6-text">
          <div className="courseframe2-header">{Course6.name}</div>
          <div className="courseframe1-detail">
            {Course6.description}
          </div>
          <button className="courseframe1-buybutton" onClick={handleClick6}>
            <b className="buy6">Buy</b>
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default CoursesSection;
