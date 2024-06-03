import React, { useEffect } from "react";
import HeaderSection from "../components/HeaderSection";
import BodySection from "../components/BodySection";
import Footer from "../components/Footer";
import VerifySection from "../components/VerifySection";
import useSigner from "../state/signer";
import { useNavigate } from "react-router-dom";

import "./VertificationNew.css";
import { motion } from "framer-motion";
const VertificationNew = () => {
  return (
    <motion.div
      className="vertificationnew"
      exit={{ opacity: 0, y: -50 }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <HeaderSection />
      <VerifySection />
      <BodySection />
      <Footer
        shapeLeft="/shape-left1.svg"
        socialIcontwitter="/socialicontwitter1.svg"
        footerDebugCommit="unset"
        footerMarginTop="unset"
      />
    </motion.div>
  );
};

export default VertificationNew;
