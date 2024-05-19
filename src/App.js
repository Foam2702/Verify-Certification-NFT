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
