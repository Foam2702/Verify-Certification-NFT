import CareersSection from "../components/CareersSection";
import Header from "../components/Header";
import FooterBottom from "../components/FooterBottom";
import FooterTop from "../components/FooterTop";
import "./Vertifications.css";

const Vertifications = () => {
  return (
    <div className="vertifications1">
      <Header />
      <section className="header">
        <div className="header-image">
          <img className="image-icon" alt="" src="/image@2x.png" />
          <div className="orange" />
        </div>
        <div className="header-text">
          <div className="n-vi-trang">
            Đến với trang web của chúng tôi - nơi cung cấp dịch vụ xác thực
            chứng chỉ uy tín và đáng tin cậy nhất. Với công nghệ tiên tiến,
            chúng tôi cam kết đảm bảo tính bảo mật cao nhất cho mọi giao dịch
            của bạn. Hãy đến với chúng tôi để trải nghiệm sự an tâm và chuyên
            nghiệp ngay hôm nay!"
          </div>
          <h1 className="xc-thc-nhanh">
            Xác thực nhanh chóng, tin cậy, với đội ngũ chuyên gia đến từ các cơ
            quan phát hành uy tín.
          </h1>
        </div>
      </section>
      <CareersSection />
      <footer className="footer">
        <FooterBottom />
        <FooterTop />
      </footer>
    </div>
  );
};

export default Vertifications;
