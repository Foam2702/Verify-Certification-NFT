import TopHeader from "../components/TopHeader";
import HeaderContainer from "../components/HeaderContainer";
import FrameComponent from "../components/FrameComponent";
import "./LisenceView.css";

const LisenceView = () => {
  return (
    <div className="lisenceview">
      <section className="header-section-parent">
        <div className="header-section">
          <TopHeader />
          <HeaderContainer />
        </div>
        <div className="body-header-wrapper">
          <div className="body-header">
            <h1 className="body-header-text2">Thông tin chứng chỉ</h1>
          </div>
        </div>
        <div className="upload-wrapper">
          <div className="upload">
            <h3 className="lisence-name">Name Lisence:</h3>
            <h3 className="lisence-infor">Infor here:</h3>
            <div className="link-to-transactions">Link to Transactions</div>
          </div>
        </div>
      </section>
      <FrameComponent />
    </div>
  );
};

export default LisenceView;
