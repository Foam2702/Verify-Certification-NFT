import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Vertifications from "./pages/Vertifications";
import Home from "./pages/Home";
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
      case "/home1":
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
        <Route path="/verification" element={<Vertifications />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </SignerProvider>


  );
}
export default App;
