import "./Header.css";
import useSigner from "../state/signer";
import AddressAvatar from "../components/AddressAvatar"

const Header = () => {
  const { address, connectMetaMask } = useSigner()

  return (
    <nav className="navbar">
      <button className="button3">
        <img
          className="thit-k-cha-c-tn-4-1"
          alt=""
          src="/thit-k-cha-c-tn-4-1@2x.png"
        />
      </button>
      <button className="log-in" onClick={connectMetaMask}>{address ? <AddressAvatar address={address} /> : "LOG IN"}</button>

      <div className="team-abc1">Team ABC</div>
    </nav>
  );
};

export default Header;
