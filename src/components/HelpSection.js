import "./HelpSection.css";
import { Navigate, useNavigate } from "react-router-dom";
import * as React from 'react';
import { useState } from "react";

import CircularProgress from '@mui/material/CircularProgress';
import useSigner from "../state/signer";
const HelpSection = () => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const { address, connectWallet } = useSigner()
  const navigate = useNavigate();
  const handleVerification = async () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      if (!address) {
        navigate("/");
      } else {
        navigate("/verification");
      }
      setLoading(false);
    }, 1000);
  }
  const handleBuyCourses = async () => {
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
  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
      <div className="help-section">
        <div className="link-to-pages">
          <div className="link-to-vertification-page">
            <button onClick={handleVerification} >
              <img
                className="vertification-image-icon"
                loading="lazy"
                alt=""
                src="/vertification-image@2x.png"
              />
            </button>
            <h3 className="vertification-text">Xác thực chứng chỉ</h3>
            <div className="describe-text">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
            <div className="learn-more-parent">
              <button className="learn-more" onClick={handleVerification} >Learn More</button>
              <button className="icon-wrapper" >
                <img className="icon" loading="lazy" alt="" src="/icon@2x.png" />
              </button>
            </div>
          </div>
          <div className="link-to-upload-to-course">
            <img
              className="upload-to-upload-image"
              loading="lazy"
              alt=""
              src="/upload-to-upload-image@2x.png"
            />
            <h3 className="upload-to-course">Đăng khóa học</h3>
            <div className="describe-text1">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
            <div className="learn-more-group">
              <div className="learn-more1">Learn More</div>
              <div className="icon-container">
                <img className="icon1" alt="" src="/icon-1@2x.png" />
              </div>
            </div>
          </div>
          <button className="link-to-buy-course" onClick={handleBuyCourses}>
            <img
              className="buy-course-image"
              loading="lazy"
              alt=""
              src="/buy-course-image@2x.png"
            />
            <h3 className="buy-course">Mua khóa học</h3>
            <div className="describe-text2">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet eros blandit, hendrerit elit et, `}</div>
            <div className="learn-more-container">
              <button className="learn-more2" onClick={handleBuyCourses}>Learn More</button>
              <div className="icon-frame">
                <img className="icon2" alt="" src="/icon@2x.png" />
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default HelpSection;
