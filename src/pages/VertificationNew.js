import HeaderSection1 from "../components/HeaderSection1";
import BodyFormSection from "../components/Body Section";
import Footer from "../components/Footer";
import "./VertificationNew.css";

const VertificationNew = () => {
  return (
    <div className="vertificationnew">
      <HeaderSection1 />
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
