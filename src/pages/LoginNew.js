import HeaderSection from "../components/HeaderSection";
import HelpSection from "../components/HelpSection";
import FeauresSection from "../components/FeauresSection";
import Footer from "../components/Footer";
import "./LoginNew.css";

const LoginNew = () => {
  return (

    <div className="loginnew">

      <HeaderSection />
      <section className="body-section">
        <div className="body-header-1">
          <h1 className="body-header-text">
            Hơn 2000 chứng chỉ được xác thực tại ABC mỗi năm
          </h1>
          <div className="body-header-text1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            sit amet eros blandit, hendrerit elit et, mattis purus. Vivamus
            commodo suscipit tellus et pellentesque.
          </div>
        </div>
        <HelpSection />
        <FeauresSection />
      </section>
      <Footer
        shapeLeft="/shape-left@2x.png"
        socialIcontwitter="/socialicontwitter@2x.png"
      />
    </div>
  );
};

export default LoginNew;
