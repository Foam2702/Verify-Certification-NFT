import HeaderSection from "../components/HeaderSection";
import HelpSection from "../components/HelpSection";
import FeauresSection from "../components/FeauresSection";
import Footer from "../components/Footer";
import HomeSection from "../components/HomeSection";
import "./LoginNew.css";
import { motion } from "framer-motion";

const LoginNew = () => {
  return (
    <motion.div
      exit={{ opacity: 0, y: -50 }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="loginnew"
    >
      <HeaderSection />
      <section className="body-section">
        <HomeSection />

        <div className="body-header-1">
          <h1 className="body-header-text">
            Hơn 2000 chứng chỉ được xác thực tại VSCourses
          </h1>
          <div className="body-header-text1">
            Trong thời đại kỹ thuật số ngày nay,
            việc xác thực và bảo vệ chứng chỉ trở nên quan trọng hơn bao giờ hết.
            Chúng tôi mang đến một giải pháp tiên tiến và bảo mật để xác thực chứng chỉ của bạn bằng cách sử dụng công nghệ Soulbound Token (SBT).
            SBT là một loại token không thể chuyển nhượng, được liên kết trực tiếp với danh tính của bạn, đảm bảo rằng các chứng chỉ không thể bị giả mạo hay chuyển nhượng cho người khác.
          </div>
        </div>
        <HelpSection />
        <FeauresSection />
      </section>
      <Footer
        shapeLeft="/shape-left@2x.png"
        socialIcontwitter="/socialicontwitter@2x.png"
      />
    </motion.div>
  );
};

export default LoginNew;
