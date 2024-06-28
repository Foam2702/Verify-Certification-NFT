// import HeaderSection from "../components/HeaderSection2";
import BodyCourses from "../components/BodyCourses";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";
import CourseSection from "../components/CourseSection"
import React from 'react'
import { Navigate } from 'react-router-dom';
import useSigner from "../state/signer";
import "./CourseTransferNew.css";

const CourseTransferNew = () => {
  const adminAddress = process.env.REACT_APP_ADMIN;
  const { signer, address, connectWallet, contract, provider, getPublicKey } = useSigner();

  if (address == adminAddress) {
    return <Navigate to="/" />;
  }
  return (
    <div className="coursetransfernew">
      <div className="header-section">
        <HeaderSection />
      </div>
      <CourseSection />

      <BodyCourses />
      <Footer
        shapeLeft="/shape-left@2x.png"
        socialIcontwitter="/socialicontwitter@2x.png"
      />    </div>
  );
};

export default CourseTransferNew;
