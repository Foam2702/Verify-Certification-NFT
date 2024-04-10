import "./Header.css";

const Header = () => {
  return (
    <div className="navbarframe">
      <div className="teamabc">Team ABC</div>
      <div className="navbaroptions">
        <button className="notibutton">
          <img className="notiicon" alt="" src="/notiicon@2x.png" />
        </button>
        <button className="accountbutton">
          <img className="accounticon" alt="" src="/accounticon@2x.png" />
        </button>
      </div>
    </div>
  );
};

export default Header;
