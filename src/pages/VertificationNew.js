import React, { useEffect } from 'react';
import HeaderSection from "../components/HeaderSection";
import BodySection from "../components/BodySection";
import Footer from "../components/Footer";
import VerifySection from '../components/VerifySection';
import useSigner from "../state/signer";
import { useNavigate } from "react-router-dom";

import "./VertificationNew.css";

const VertificationNew = () => {


  return (
    <div className="vertificationnew">
      <HeaderSection />
      <VerifySection />
      <BodySection />
      <Footer
        shapeLeft="/shape-left1.svg"
        socialIcontwitter="/socialicontwitter1.svg"
        footerDebugCommit="unset"
        footerMarginTop="unset"
      />
    </div>
  );
};

export default VertificationNew;