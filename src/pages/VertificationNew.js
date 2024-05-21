import HeaderSection from "../components/HeaderSection";
import BodyFormSection from "../components/Body Section";
import Footer from "../components/Footer";
import "./VertificationNew.css";

const VertificationNew = () => {
  return (
    <div className="vertificationnew">
      <HeaderSection />
      <BodyFormSection />
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
