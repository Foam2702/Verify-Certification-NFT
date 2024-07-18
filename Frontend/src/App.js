import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,

} from "react-router-dom";
import React from "react"
import LoginNew from "./pages/LoginNew";
import VertificationNew from "./pages/VertificationNew";
import VerificationForIssuer from "./pages/VerificationForIssuer";
import Exam from "./pages/Exam";
import CourseTransferNew from "./pages/CourseTransferNew";
import CourseInforNew from "./pages/CourseInforNew";
import { SignerProvider } from "./state/signer";
import LisenceView from "./pages/LisenceView";
import useSigner from "./state/signer";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import NotFound from "./pages/NotFound";
import { Profile } from "./pages/Profile";
import UploadExam from "./pages/UploadExam";
import MetaMaskRequired from "./components/MetaMaskRequired";
import Share from "./pages/Share";
import EditExam from "./pages/EditExam";
function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;
  const { loading, address } = useSigner();

  const navigate = useNavigate();

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);
  useEffect(() => {
    if (address === null) {
      navigate("/");
    }
  }, [address, navigate]);
  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "VSCourses";
        break;
      case "/admin":
        title = "Admin Dashboard";
        break;
      case "/coursetransfernew":
        title = "Course Transfer";
        break;
      case "/courseinfornew":
        title = "Course Information";
        break;
      case "/courses/course/:id/exam":
        title = "Course Exam";
        break;
      case "/lisenceview":
        title = "License View";
        break;
      case "/tickets/ticket/:id":
        title = "Ticket Verification";
        break;
      case "/verification":
        title = "Verification";
        break;
      default:
        title = "VSCourses";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <AnimatePresence wait>
      <SignerProvider>
        {loading && (
          <div className="loading-overlay">
            <CircularProgress />
          </div>
        )}

        <Routes>
          <Route path="/share/:id" element={<Share />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editexam/:id" element={<EditExam />} />
          <Route path="/uploadexam" element={<UploadExam />} />
          <Route path="/coursetransfernew" element={<CourseTransferNew />} />
          <Route path="/courseinfornew" element={<CourseInforNew />} />
          <Route path="/courses/course/:id/exam" element={<Exam />} />
          <Route path="/lisenceview" element={<LisenceView />} />
          <Route
            path="/tickets/ticket/:id"
            element={<VerificationForIssuer />}
          />
          <Route path="/verification" element={<VertificationNew />} />
          <Route path="/" element={<LoginNew />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </SignerProvider>
    </AnimatePresence>
  );
}
export default App;
