import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import LoginNew from "./pages/LoginNew";
import VertificationNew from "./pages/VertificationNew";
import LisenceView from "./pages/LisenceView";
import CourseTransferNew from "./pages/CourseTransferNew";
import CourseInforNew from "./pages/CourseInforNew";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/vertificationnew":
        title = "";
        metaDescription = "";
        break;
      case "/lisenceview":
        title = "";
        metaDescription = "";
        break;
      case "/coursetransfernew":
        title = "";
        metaDescription = "";
        break;
      case "/courseinfornew":
        title = "";
        metaDescription = "";
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
    <Routes>
      <Route path="/" element={<LoginNew />} />
      <Route path="/vertificationnew" element={<VertificationNew />} />
      <Route path="/lisenceview" element={<LisenceView />} />
      <Route path="/coursetransfernew" element={<CourseTransferNew />} />
      <Route path="/courseinfornew" element={<CourseInforNew />} />
    </Routes>
  );
}
export default App;
import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import LoginNew from "./pages/LoginNew";
import VertificationNew from "./pages/VertificationNew";
import VerificationForIssuer from "./pages/VerificationForIssuer";
import { SignerProvider } from "./state/signer"

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/vertification":
        title = "";
        metaDescription = "";
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
    <SignerProvider>
      <Routes>
        <Route path="/tickets/ticket/:id" element={<VerificationForIssuer />} />
        <Route path="/verification" element={<VertificationNew />} />
        <Route path="/" element={<LoginNew />} />
      </Routes>
    </SignerProvider>
  );
}
export default App;
