import "./HeaderSection.css";

const HeaderSection = () => {
  return (
    <div className="headersection">
      <div className="headertext">
        <div className="courseheader">
          Helping the next generation of leaders
        </div>
        <div className="coursedetail">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The Maker is a
          decentralized. We aim to attain the
        </div>
        <button className="course-buybutton">
          <b className="buy">Buy</b>
        </button>
      </div>
      <img
        className="headerimageframe-icon"
        alt=""
        src="/headerimageframe@2x.png"
      />
    </div>
  );
};

export default HeaderSection;
