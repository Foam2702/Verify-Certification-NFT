import FrameComponent3 from "./FrameComponent3";
import FrameComponent from "./FrameComponent";
import FooterBottom from "./FooterBottom";
import "./TrangXcThcPhaCustomer.css";

const TrangXcThcPhaCustomer = () => {
  return (
    <div className="trang-xc-thc-pha-customer">
      <FrameComponent3 />
      <section className="trang-xc-thc-pha-customer-inner">
        <FrameComponent />
      </section>
      <FooterBottom />
    </div>
  );
};

export default TrangXcThcPhaCustomer;
