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
import LisenceView from "./pages/LisenceView";
import useSigner from "./state/signer";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

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
        title = "";
        metaDescription = "";
        break;
      case "/vertification":
        title = "";
        metaDescription = "";
        break;
      case "/lisenceview":
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
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
      <Routes>
        <Route path="/lisenceview" element={<LisenceView />} />
        <Route path="/tickets/ticket/:id" element={<VerificationForIssuer />} />
        <Route path="/verification" element={<VertificationNew />} />
        <Route path="/" element={<LoginNew />} />
      </Routes>
    </SignerProvider>
  );
}
export default App;
